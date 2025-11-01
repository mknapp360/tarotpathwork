// api/og/[slug].tsx
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const SITE = 'https://www.tarotpathwork.com'; // <-- set your canonical domain
const BG_FALLBACK = `${SITE}/og-bg.png`;       // optional background in /public
const LOGO = `${SITE}/tp-logo-mark.png`;       // optional logo in /public

// Cache the font in memory across invocations
let interSemiBold: ArrayBuffer | null = null;
async function loadFont(): Promise<ArrayBuffer> {
  if (!interSemiBold) {
    const r = await fetch(
      'https://assets.vercel.com/fonts/inter/Inter-SemiBold.ttf'
    );
    interSemiBold = await r.arrayBuffer();
  }
  return interSemiBold;
}

function getSlugFromUrl(url: string): string {
  const u = new URL(url);
  const parts = u.pathname.split('/');
  return parts[parts.length - 1] || '';
}

export default async function handler(req: Request) {
  try {
    const slug = getSlugFromUrl(req.url);

    const SUPABASE_URL =
      process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY =
      process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Missing Supabase env vars');
    }

    // Fetch the post by slug or id
    const endpoint = `${SUPABASE_URL}/rest/v1/posts?select=*&published=eq.true&or=(slug.eq.${encodeURIComponent(slug)},id.eq.${encodeURIComponent(slug)})&limit=1`;

    const resp = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    const data = (await resp.json()) as any[];
    const post = Array.isArray(data) ? data[0] : null;

    const title: string = (post?.title as string) || 'Tarot Pathwork';
    const rawContent: string = (post?.content as string) || '';
    const subtitle: string =
      (post?.excerpt as string) ||
      (rawContent.replace(/<[^>]*>/g, '').slice(0, 140).trim() +
        (rawContent ? '…' : ''));
    const bg: string = (post?.cover_image as string) || BG_FALLBACK;

    const fontData = await loadFont();

    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            position: 'relative',
            backgroundColor: '#0b0b0b',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(0,0,0,0.75), rgba(0,0,0,0.35))',
            }}
          />

          {/* Content */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: '56px 64px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {LOGO ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={LOGO}
                  alt=""
                  width={64}
                  height={64}
                  style={{
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.04)',
                    padding: 8,
                  }}
                />
              ) : null}
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: 28,
                  letterSpacing: -0.2,
                  color: 'white',
                  opacity: 0.9,
                }}
              >
                Tarot Pathwork
              </div>
            </div>

            {/* Title Card */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                maxWidth: 900,
                padding: '28px 32px',
                borderRadius: 20,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
                backdropFilter: 'blur(6px)',
                color: 'white',
                boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 62,
                  lineHeight: 1.08,
                }}
              >
                {title}
              </div>
              {subtitle ? (
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 28,
                    opacity: 0.85,
                  }}
                >
                  {subtitle}
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
                opacity: 0.9,
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: 24,
                  letterSpacing: 0.3,
                }}
              >
                tarotpathwork.com
              </div>
              <div
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.25)',
                  fontFamily: 'Inter',
                  fontSize: 20,
                }}
              >
                Kabbalah • Tarot • Angels
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 600,
          },
        ],
      }
    );
  } catch (e) {
    // Fallback image if anything goes wrong
    const fontData = await loadFont();
    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0b0b0b',
            color: 'white',
            fontSize: 48,
            fontFamily: 'Inter',
          }}
        >
          Tarot Pathwork
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 600,
          },
        ],
      }
    );
  }
}