// /api/analytics.ts
import type { IncomingMessage, ServerResponse } from 'http';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

type AnalyticsMetric = { value: number; previousValue: number; percentageChange: number; };
type AnalyticsData = {
  sessions: AnalyticsMetric;
  pageviews: AnalyticsMetric;
  users: AnalyticsMetric;
  bounceRate: AnalyticsMetric;
  avgSessionDuration: AnalyticsMetric;
  sessions7Day: { date: string; value: number }[];
  pageviews7Day: { date: string; value: number }[];
  topPages: { page: string; views: number }[];
};

const isProd = process.env.NODE_ENV === 'production';

function pctChange(curr: number, prev: number) {
  if (!prev) return curr ? 100 : 0;
  return Math.round(((curr - prev) / prev) * 100);
}
function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  const json = (code: number, body: unknown) => {
    res.statusCode = code;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
  };

  try {
    const PROPERTY_ID = process.env.GA4_PROPERTY_ID!;
    const CLIENT_EMAIL = process.env.GA4_CLIENT_EMAIL!;
    const PRIVATE_KEY = process.env.GA4_PRIVATE_KEY!.replace(/\\n/g, '\n');

    const client = new BetaAnalyticsDataClient({
      credentials: { client_email: CLIENT_EMAIL, private_key: PRIVATE_KEY },
    });

    // 1) Totals: keep it simple first (sessions + pageviews + users)
    // Use GA4-safe names: sessions, screenPageViews, totalUsers
    const [totals] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        { startDate: '7daysAgo', endDate: 'today', name: 'current' },
        { startDate: '14daysAgo', endDate: '7daysAgo', name: 'previous' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'screenPageViews' },   // pageviews
        { name: 'totalUsers' },        // safer than activeUsers
      ],
    });

    const curr = totals.rows?.[0]?.metricValues ?? [];
    const prev = totals.rows?.[1]?.metricValues ?? [];
    const num = (arr: any[], i: number) => Number(arr[i]?.value ?? 0);

    const mSessions = { current: num(curr,0), previous: num(prev,0) };
    const mViews    = { current: num(curr,1), previous: num(prev,1) };
    const mUsers    = { current: num(curr,2), previous: num(prev,2) };

    const pct = (c:number,p:number) => (!p ? (c?100:0) : Math.round(((c-p)/p)*100));

    // 2) Sessions series
    const [seriesSessions] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });
    const sessions7Day = (seriesSessions.rows ?? []).map(r => {
        const d = r.dimensionValues?.[0]?.value ?? ''; // e.g. "20251101"
        const iso = d ? `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}` : '';
        return { date: iso, value: Number(r.metricValues?.[0]?.value ?? 0) };
    });

    // 3) Pageviews series
    const [seriesViews] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });
    const pageviews7Day = (seriesViews.rows ?? []).map(r => {
        const d = r.dimensionValues?.[0]?.value ?? '';
        const iso = d ? `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}` : '';
        return { date: iso, value: Number(r.metricValues?.[0]?.value ?? 0) };
    });

    // 4) Top pages
    const [top] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 5,
    });
    const topPages = (top.rows ?? []).map(r => ({
      page: r.dimensionValues?.[0]?.value ?? '',
      views: Number(r.metricValues?.[0]?.value ?? 0),
    }));

    // 5) Optional extras in separate calls (add AFTER it all works)
    // Bounce rate
    let bounceRate = { value: 0, previousValue: 0, percentageChange: 0 };
    try {
      const [br] = await client.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [
          { startDate: '7daysAgo', endDate: 'today', name: 'current' },
          { startDate: '14daysAgo', endDate: '7daysAgo', name: 'previous' },
        ],
        metrics: [{ name: 'bounceRate' }],
      });
      const c = Number(br.rows?.[0]?.metricValues?.[0]?.value ?? 0);
      const p = Number(br.rows?.[1]?.metricValues?.[0]?.value ?? 0);
      bounceRate = { value: Math.round(c), previousValue: Math.round(p), percentageChange: pct(c,p) };
    } catch {}

    // Avg session duration
    let avgSessionDuration = { value: 0, previousValue: 0, percentageChange: 0 };
    try {
      const [asd] = await client.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [
          { startDate: '7daysAgo', endDate: 'today', name: 'current' },
          { startDate: '14daysAgo', endDate: '7daysAgo', name: 'previous' },
        ],
        metrics: [{ name: 'averageSessionDuration' }],
      });
      const c = Number(asd.rows?.[0]?.metricValues?.[0]?.value ?? 0);
      const p = Number(asd.rows?.[1]?.metricValues?.[0]?.value ?? 0);
      avgSessionDuration = { value: Math.round(c), previousValue: Math.round(p), percentageChange: pct(c,p) };
    } catch {}

    const data = {
      sessions: { value: mSessions.current, previousValue: mSessions.previous, percentageChange: pct(mSessions.current, mSessions.previous) },
      pageviews:{ value: mViews.current,    previousValue: mViews.previous,    percentageChange: pct(mViews.current,    mViews.previous) },
      users:    { value: mUsers.current,    previousValue: mUsers.previous,    percentageChange: pct(mUsers.current,    mUsers.previous) },
      bounceRate,
      avgSessionDuration,
      sessions7Day,
      pageviews7Day,
      topPages,
    };

    return json(200, data);
  } catch (err: any) {
    console.error('GA4 API error:', { message: err?.message, code: err?.code, name: err?.name, details: err?.details });
    return json(500, { error: 'Failed to fetch analytics', debug: { message: err?.message, code: err?.code, name: err?.name, details: err?.details } });
  }
}
