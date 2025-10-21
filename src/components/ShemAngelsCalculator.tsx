import React, { useMemo, useRef, useState } from "react";
import type { ShemAngel } from "../lib/shemAngels";
import { SHEM_ANGELS } from "../lib/shemAngels";

// Optional: if you install html2canvas, uncomment the import below and the handler will work.
// npm i html2canvas
// import html2canvas from "html2canvas";

// --- Helpers ---
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function formatDateForMatch(date: Date) {
  const month = MONTHS[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  return `${month} ${day}`; // e.g., "March 21"
}

function within(list: string[], token: string) {
  // Straight equality match; dataset already uses "Month DD"
  return list.includes(token);
}

function getGuardianAngel(date: Date, angels: ShemAngel[]): ShemAngel | undefined {
  const token = formatDateForMatch(date);
  return angels.find((a) => within(a.guardian_dates, token));
}

function getMoralityAngel(date: Date, angels: ShemAngel[]): ShemAngel | undefined {
  const token = formatDateForMatch(date);
  return angels.find((a) => within(a.morality_dates, token));
}

function getSoulAngel(timeStr: string, angels: ShemAngel[]): ShemAngel | undefined {
  // 72 angels → 24h / 72 = 20 min blocks
  // Expect HH:MM (24h). If 12h is used, rely on browser to normalize via input[type=time].
  const [hh, mm] = timeStr.split(":").map(Number);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return undefined;
  const total = hh * 60 + mm;
  const idx = Math.floor(total / 20) % angels.length; // 0..71
  return angels[idx];
}

// --- UI Card ---
function AngelCard({ title, angel, bgUrl }: { title: string; angel?: ShemAngel; bgUrl?: string }) {
  return (
    <div
      className="relative rounded-2xl shadow-xl min-h-[280px] p-8 flex items-center justify-end overflow-hidden"
      style={bgUrl ? { backgroundImage: `url(${bgUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-[60%] text-right text-white font-serif">
        <div className="text-xl opacity-90 mb-1">{title}</div>
        <div className="text-2xl md:text-3xl font-bold">
          {angel ? (
            <>
              {angel.name} <span className="opacity-90">#{angel.number}</span>
            </>
          ) : (
            "—"
          )}
        </div>
        <p className="mt-3 text-sm md:text-base leading-relaxed">
          {angel?.description || "No description provided yet."}
        </p>
      </div>
    </div>
  );
}

export default function ShemAngelsCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [birthTime, setBirthTime] = useState<string>("");
  const [touched, setTouched] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const { guardian, morality, soul } = useMemo(() => {
    if (!birthDate || !birthTime) return { guardian: undefined, morality: undefined, soul: undefined };
    // NOTE: Using local time input; if you want Europe/London normalization, convert with Date.UTC and timezone libs.
    const d = new Date(birthDate + "T12:00:00"); // noon to avoid DST midnight edge cases when parsing just the date
    return {
      guardian: getGuardianAngel(d, SHEM_ANGELS),
      morality: getMoralityAngel(d, SHEM_ANGELS),
      soul: getSoulAngel(birthTime, SHEM_ANGELS),
    };
  }, [birthDate, birthTime]);

  const isReady = Boolean(birthDate && birthTime);

  async function handleDownload() {
    if (!resultRef.current) return;
    // If html2canvas is installed, this will work after you uncomment the import.
    // const canvas = await html2canvas(resultRef.current, { scale: 2, backgroundColor: "#0b0b0b" });
    // const link = document.createElement("a");
    // link.download = "my-shem-angels.png";
    // link.href = canvas.toDataURL("image/png");
    // link.click();
    alert("Enable html2canvas (see code comments) to use image download.");
  }

  function handleShareFacebook() {
    const shareText =
      "Discover the 3 Shem HaMephorash birth angels like I just did (free calculator).";
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://tarotpathwork.com/shem-angels"
    )}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, "facebook-share-dialog", "width=626,height=436");
  }

  // Optional background art per card (replace with your own assets)
  const backgrounds: Record<string, string | undefined> = {
    guardian: "/images/shem/guardian.png",
    morality: "/images/shem/morality.png",
    soul: "/images/shem/soul.png",
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-6">
        Discover Your 3 Shem HaMephorash Birth Angels
      </h1>

      <div className="grid md:grid-cols-3 gap-4 items-end mb-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="dob" className="text-sm text-white/80">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            className="bg-tpblack/40 border border-white/10 rounded-xl px-3 py-2 text-white"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            onBlur={() => setTouched(true)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tob" className="text-sm text-white/80">
            Time of Birth (24h)
          </label>
          <input
            id="tob"
            type="time"
            className="bg-tpblack/40 border border-white/10 rounded-xl px-3 py-2 text-white"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            onBlur={() => setTouched(true)}
          />
        </div>
        <div className="flex gap-3 md:justify-end">
          <button
            onClick={() => setTouched(true)}
            className="bg-white text-black rounded-xl px-4 py-2 font-medium hover:bg-white/90 transition"
          >
            Calculate
          </button>
          <button
            onClick={handleDownload}
            className="bg-tpblack border border-white/20 text-white rounded-xl px-4 py-2 hover:bg-white/5 transition"
          >
            Download Image
          </button>
          <button
            onClick={handleShareFacebook}
            className="bg-[#1877f2] text-white rounded-xl px-4 py-2 hover:brightness-110 transition"
            title="Share on Facebook"
          >
            Share
          </button>
        </div>
      </div>

      {!isReady && touched && (
        <p className="text-sm text-red-300 mb-4">Please enter both date and time.</p>
      )}

      <div ref={resultRef} className="space-y-6">
        <AngelCard title="Your Guardian Angel" angel={guardian} bgUrl={backgrounds.guardian} />
        <AngelCard title="Your Angel of Morality" angel={morality} bgUrl={backgrounds.morality} />
        <AngelCard title="Angel of Your Soul" angel={soul} bgUrl={backgrounds.soul} />
      </div>

      <p className="mt-6 text-sm text-white/60">
        Tip: If your birth time is unknown, choose the nearest 20-minute block or noon.
      </p>
    </div>
  );
}