"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
export default function Home() {
   const audioRef = useRef<HTMLAudioElement>(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentSong, setCurrentSong] = useState("Načítavam...");
   const [menuOpen, setMenuOpen] = useState(false);
   const toggleRadio = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    audioRef.current.play();
    setIsPlaying(true);
  }
};
  useEffect(() => {
  const loadSong = async () => {
    try {
      const response = await fetch("http://localhost:8000/status-json.xsl");
      const data = await response.json();
      const title = data.icestats.source.metadata.x_icy_title.split(/[\\/]/).pop().replace(/\.mp3$/i, "").replace(/-\d+$/, "").replaceAll("_", " ").replaceAll("-", " ");
setCurrentSong(title);

    } catch (error) {
      console.error("Chyba Icecast:", error);
    }
  };
  loadSong();

const interval = setInterval(loadSong, 5000);

return () => clearInterval(interval);
}, []);
return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <audio
  ref={audioRef}
  src="http://localhost:8000/stream.mp3"
/>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-pink-500/20 bg-black/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-8">
          
          <Image
  src="/vibe-logo.jpg"
  alt="Vibe Radio"
  width={150}
  height={150}
  className="h-16 w-16 rounded-full object-cover"
  />
          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            <a href="#domov" className="text-pink-500">
              DOMOV
            </a>
            <a href="#prave-hra" className="hover:text-pink-500">
              PRÁVE HRÁ
            </a>
            <a href="#program" className="hover:text-pink-500">
              PROGRAM
            </a>
            <a href="#moderatori" className="hover:text-pink-500">
              MODERÁTORI
            </a>
            <a href="#novinky" className="hover:text-pink-500">
              NOVINKY
            </a>
            <a href="#kontakt" className="hover:text-pink-500">
              KONTAKT
            </a>
          </nav>
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="text-3xl md:hidden"
>
  {menuOpen ? "✕" : "☰"}
</button>

        </div>
      </header>
{menuOpen && (
  <div className="fixed top-[104px] left-0 right-0 z-50 md:hidden bg-black/95 border-b border-pink-500/20 text-center py-5">
    <a
  href="#domov"
  onClick={() => setMenuOpen(false)}
  className="block py-2 hover:text-pink-500"
>
  DOMOV
</a>
    <a
  href="#prave-hra"
  onClick={() => setMenuOpen(false)}
  className="block py-2 hover:text-pink-500"
>
  PRÁVE HRÁ
</a>

    <a
  href="#program"
  onClick={() => setMenuOpen(false)}
  className="block py-2 hover:text-pink-500"
>
  PROGRAM
</a>
    <a
  href="#moderatori"
  onClick={() => setMenuOpen(false)}
  className="block py-2 hover:text-pink-500"
>
  MODERÁTORI
</a>

    <a
  href="#novinky"
  onClick={() => setMenuOpen(false)}
  className="block py-2 hover:text-pink-500"
>
  NOVINKY
</a>
    <a
  href="#kontakt"
  onClick={() => setMenuOpen(false)}
  className="block py-2 hover:text-pink-500"
>
  KONTAKT
</a>
  </div>
)}

      <section id="domov" className="flex min-h-[650px] md:min-h-[700px] items-center justify-center px-6 pt-24 pb-16 text-center">
        <div>
         <Image
  src="/vibe-logo.jpg"
  alt="Vibe Radio"
  width={500}
  height={500}
  className="mx-auto mb-4 w-[260px] rounded-3xl shadow-[0_0_70px_rgba(236,72,153,0.35)] md:w-[320px]"
  priority 
         />
         <p className="mb-4 font-bold tracking-[0.4em] text-cyan-400">
            VIBE RADIO
          </p>

          <h1 className="text-5xl font-black leading-tight md:text-8xl">
            Tvoj vibe.
            <span className="block text-pink-500">
              Tvoja hudba.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
            24/7 • NAJNOVŠIE HITY • DOBRÁ ATMOSFÉRA
          </p>
<p id="prave-hra" className="scroll-mt-40 mt-6 text-lg font-bold text-cyan-400">
  🎵 Práve hrá: {currentSong}
</p>
 <button
  onClick={toggleRadio}
  className="mt-10 inline-block rounded-full bg-pink-500 px-14 py-5 text-xl font-bold shadow-[0_0_35px_rgba(236,72,153,0.55)]"
>
  {isPlaying ? "⏸ POZASTAVIŤ" : "▶ POČÚVAŤ NAŽIVO"}
</button>
  </div></section>
      <section id="program" className="scroll-mt-24 pt-10 pb-10 text-center">
  <h2 className="text-4xl font-bold text-pink-500">PROGRAM</h2>
  <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-pink-500/30 bg-white/5 p-6 shadow-lg">
  <p className="text-pink-500 font-bold">06:00 – 10:00</p>
  <h3 className="mt-2 text-2xl font-bold">Ranný Vibe</h3>
</div>
<div className="mx-auto mt-4 max-w-xl rounded-2xl border border-cyan-400/30 bg-white/5 p-6 shadow-lg">
  <p className="text-cyan-400 font-bold">10:00 – 14:00</p>
  <h3 className="mt-2 text-2xl font-bold">Vibe Hits</h3>
</div>
<div className="mx-auto mt-4 max-w-xl rounded-2xl border border-pink-500/30 bg-white/5 p-6 shadow-lg">
  <p className="text-pink-500 font-bold">14:00 – 18:00</p>
  <h3 className="mt-2 text-2xl font-bold">Popoludňajší Vibe</h3>
</div>
<div className="mx-auto mt-4 max-w-xl rounded-2xl border border-cyan-400/30 bg-white/5 p-6 shadow-lg">
  <p className="text-cyan-400 font-bold">18:00 – 22:00</p>
  <h3 className="mt-2 text-2xl font-bold">Večerný Vibe</h3>
</div>

<div className="mx-auto mt-4 max-w-xl rounded-2xl border border-pink-500/30 bg-white/5 p-6 shadow-lg">
  <p className="text-pink-500 font-bold">22:00 – 06:00</p>
  <h3 className="mt-2 text-2xl font-bold">Nočný Vibe</h3>
</div>
</section>
<section id="moderatori" className="scroll-mt-24 py-20 text-center">
  <h2 className="text-4xl font-bold text-cyan-400">MODERÁTORI</h2>
  <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-pink-500/30 bg-white/5 p-6">
  <div className="text-5xl">🎙️</div>
  <h3 className="mt-4 text-2xl font-bold">Majkyy</h3>
  <p className="mt-2 text-pink-500">Moderátor Vibe Radio</p>
</div>
</section>
<section id="novinky" className="scroll-mt-24 py-20 text-center">
  <h2 className="text-4xl font-bold text-pink-500">NOVINKY</h2>
  <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-pink-500/30 bg-white/5 p-6 text-left">
  <p className="text-sm font-bold text-pink-500">VIBE RADIO</p>
  <h3 className="mt-2 text-2xl font-bold">Vitaj vo Vibe Radio!</h3>
  <p className="mt-2 text-gray-300">
    Tvoj nový online priestor pre najlepšiu hudbu a dobrý vibe.
  </p>
</div>
</section>
<section id="kontakt" className="scroll-mt-24 py-20 text-center">
  <h2 className="text-4xl font-bold text-cyan-400">KONTAKT</h2>
  <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-cyan-400/30 bg-white/5 p-6">
  <h3 className="text-2xl font-bold">Napíš nám</h3>
  <p className="mt-3 text-gray-300">
    Máš otázku, tip na skladbu alebo chceš pozdraviť poslucháčov?
  </p>
  <a
  href="mailto:vibeeradioo@gmail.com"
  className="mt-4 inline-block font-bold text-cyan-400 hover:text-pink-500"
>
  vibeeradioo@gmail.com
</a>
</div>
</section>
<footer className="border-t border-pink-500/20 py-8 text-center text-sm text-gray-400">
  © 2026 Vibe Radio • Tvoj vibe. Tvoja hudba.
</footer>
    </main>
  );
}