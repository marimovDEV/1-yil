import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0);
  const audio1Ref = useRef(null);
  const audio2Ref = useRef(null);

  useEffect(() => {
    // Create audio instances on mount for pre-warm
    const audio1 = new Audio("/song1.mp3");
    audio1.loop = true;
    audio1.preload = "auto";
    audio1Ref.current = audio1;

    const audio2 = new Audio("/song2.mp3");
    audio2.loop = true;
    audio2.preload = "auto";
    audio2Ref.current = audio2;

    return () => {
      if (audio1Ref.current) audio1Ref.current.pause();
      if (audio2Ref.current) audio2Ref.current.pause();
    };
  }, []);

  const start = () => {
    if (audio1Ref.current) {
      audio1Ref.current.muted = false;
      audio1Ref.current.volume = 0.5;
      const playPromise = audio1Ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const unlock = () => {
            if (audio1Ref.current) audio1Ref.current.play();
            window.removeEventListener("touchstart", unlock);
            window.removeEventListener("click", unlock);
          };
          window.addEventListener("touchstart", unlock);
          window.addEventListener("click", unlock);
        });
      }
    }
    setStarted(true);
  };

  const switchMusic = () => {
    if (audio1Ref.current && audio2Ref.current) {
      // Fade out audio1
      let vol = 0.5;
      const fadeInterval = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audio1Ref.current.volume = vol;
        } else {
          clearInterval(fadeInterval);
          audio1Ref.current.pause();
          
          // Play audio2
          audio2Ref.current.muted = false;
          audio2Ref.current.volume = 0;
          audio2Ref.current.play().catch(e => console.log("Song 2 blocked", e));
          
          // Fade in audio2
          let vol2 = 0;
          const fadeInInterval = setInterval(() => {
            if (vol2 < 0.5) {
              vol2 += 0.05;
              audio2Ref.current.volume = Math.min(0.5, vol2);
            } else {
              clearInterval(fadeInInterval);
            }
          }, 200);
        }
      }, 200);
    }
  };

  const next = () => {
    setScene(scene + 1);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-pink-500/30 relative">
      <div className="fixed inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.04] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(80,0,80,0.05),transparent_80%)] z-[-1]" />

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
             key="intro"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
             transition={{ duration: 1.5 }}
             className="h-screen w-full flex flex-col justify-center items-center text-center px-6 relative z-10"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <p className="text-pink-200/50 mb-4 uppercase tracking-[0.4em] text-[10px] font-black">
                2025.04.17… shu kundan beri hayotim o‘zgardi.
              </p>
              <DaysCounter />
              <p className="mt-8 text-xl md:text-2xl font-serif italic text-pink-50/80 leading-relaxed max-w-sm">
                Barchin bilan o‘tgan har bir kun — men uchun alohida ❤️
              </p>
              
              <p className="mt-6 text-[10px] text-white/20 uppercase tracking-widest italic animate-pulse">
                Eng yaxshi natija uchun ovozni yoqing 🔊
              </p>

              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(219,39,119,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={start} 
                className="mt-14 bg-pink-600 hover:bg-pink-500 px-12 py-4 rounded-2xl text-lg font-black tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
              >
                Davom et ❤️
              </motion.button>
            </motion.div>
            <FloatingHearts count={10} />
          </motion.div>
        ) : (
          <motion.div key="experience" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-screen relative z-10">
            <AnimatePresence mode="wait">
              {scene === 0 && (
                <motion.div key="sc1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(20px)" }} className="relative flex flex-col items-center justify-center min-h-screen w-full px-6 overflow-hidden">
                  <FloatingHearts count={8} />
                  <motion.div className="relative max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.img src="/img1.jpg" className="w-full h-full object-cover" initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} />
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                  <motion.p className="mt-10 text-center text-xl md:text-2xl font-serif italic text-white px-4 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                    Barchin…<br />balki bu eng birinchi rasm emasdir,<br />lekin men uchun eng qadrli onlardan biri ❤️
                  </motion.p>
                </motion.div>
              )}

              {scene === 1 && (
                <motion.div key="sc2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
                  <motion.img src="/img2.jpg" className="w-64 md:w-80 rounded-[2rem] mb-10 shadow-2xl border border-white/10" initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
                  <div className="flex flex-col space-y-4 w-full max-w-xs mb-8">
                    <motion.div className="bg-gray-800 p-4 rounded-2xl rounded-tl-none self-start text-sm border border-white/5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>Shatb tapdiz instamni</motion.div>
                    <motion.div className="bg-pink-600 p-4 rounded-2xl rounded-tr-none self-end text-sm shadow-lg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>ohsham danishdiq masmi axi san bilan</motion.div>
                  </div>
                  <motion.p className="text-center text-lg md:text-xl font-serif italic text-pink-50/90 px-4 leading-relaxed max-w-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                    Barchin… boshida bunday bo‘lishini o‘ylamagandim.<br/>Oddiy yozishma edi… lekin sekin-sekin hammasi o‘zgarib ketdi.
                  </motion.p>
                </motion.div>
              )}

              {scene === 2 && (
                <PremiumGallery onNext={next} customText="Sen bilan kulgan paytlarim — eng esda qoladigan onlarim bo‘ldi. Shu lahzalar uchun hammasiga arziydi ❤️" />
              )}

              {scene === 3 && (
                <motion.div key="sc4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden">
                  <Rain />
                  <motion.div className="relative max-w-sm aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 z-10">
                    <motion.img src="/img4.jpg" className="w-full h-full object-cover" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 3 }} />
                    <div className="absolute inset-0 bg-black/70 rounded-2xl" />
                  </motion.div>
                  <motion.div className="mt-10 text-center text-lg md:text-xl font-serif italic text-gray-300 px-6 leading-relaxed relative z-20 space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                    <p>Barchin… bilaman, ba’zida seni hafa qilaman.</p>
                    <p>Lekin hech qachon seni yo‘qotishni xohlamaganman.</p>
                    <p>Qiyin paytlar ham bo‘ldi… lekin men baribir seni tanlaganman ❤️</p>
                  </motion.div>
                </motion.div>
              )}

              {scene === 4 && (
                <motion.div key="sc5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-10 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img1.jpg')" }} />
                  </AnimatePresence>
                  <motion.div className="relative z-10 text-center space-y-8 max-w-xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                    <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-pink-50">"Boshida seni bunchalik sevib qolaman deb o‘ylamagandim…"</p>
                    <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-pink-50">"Lekin vaqt o‘tgan sari bu his yanada kuchaydi. Men sen uchun ko‘p narsaga tayyorman."</p>
                    <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-pink-50 underline decoration-pink-500/50 underline-offset-8">"Ba’zida xato qilaman… lekin seni yaxshi ko‘rishim hech qachon o‘zgarmaydi ❤️"</p>
                  </motion.div>
                  <FloatingHearts count={6} />
                </motion.div>
              )}

              {scene === 5 && (
                <motion.div key="sc6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
                  <FinalProposal onMusicSwitch={switchMusic} customText="Barchin… shuncha narsadan keyin ham biz birgamiz. Va men seni tanlaganman…" />
                </motion.div>
              )}
            </AnimatePresence>

            {scene < 5 && (
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} onClick={next} 
                className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10 text-[10px] tracking-[0.6em] uppercase font-black hover:bg-white/10 transition-all active:scale-90 text-pink-200/60 shadow-2xl"
              >
                Keyingi →
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PremiumGallery({ onNext, customText }) {
  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, offsetWidth } = containerRef.current;
    const index = Math.round(scrollLeft / (offsetWidth * 0.75));
    if (index !== activeIndex && index < images.length) setActiveIndex(index);
  };

  return (
    <motion.div key="premiumGallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={activeIndex} initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 bg-cover bg-center blur-[100px] z-0" style={{ backgroundImage: `url(${images[activeIndex]})` }} />
      </AnimatePresence>
      <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mb-10 text-center px-10 text-lg md:text-xl font-serif italic text-pink-100/90 drop-shadow-lg max-w-sm">
        {customText}
      </motion.p>
      <div ref={containerRef} onScroll={handleScroll} className="relative z-10 flex space-x-6 overflow-x-auto px-[20%] w-full snap-x snap-mandatory no-scrollbar py-10">
        {images.map((img, i) => (
          <motion.div key={i} className={`flex-shrink-0 w-64 md:w-80 aspect-[4/5] rounded-[2.5rem] overflow-hidden snap-center transition-all duration-700 ease-out border border-white/10 shadow-2xl ${i === activeIndex ? "scale-100 opacity-100 blur-0" : "scale-90 opacity-40 blur-sm brightness-50"}`}>
            <img src={img} className="w-full h-full object-cover" alt="Gallery" />
          </motion.div>
        ))}
      </div>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} onClick={onNext} className="relative z-10 mt-12 bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10 text-[10px] tracking-[0.6em] uppercase font-black hover:bg-white/10 transition-all active:scale-90 text-pink-200/60 shadow-2xl">Keyingi →</motion.button>
    </motion.div>
  );
}

function FinalProposal({ customText, onMusicSwitch }) {
  const [opened, setOpened] = useState(false);
  const [loved, setLoved] = useState(false);

  useEffect(() => {
    if (opened) {
      onMusicSwitch();
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ["#ff1d8e", "#ffd700", "#ffffff"] });
    }
  }, [opened, onMusicSwitch]);

  if (loved) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-screen text-center px-6">
       <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-9xl mb-14">❤️</motion.div>
        <h1 className="text-5xl md:text-7xl font-serif font-black mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-pink-500">U ROZI BO'LDI!</h1>
        <p className="text-2xl text-pink-200 opacity-80 uppercase tracking-widest italic font-light italic text-center">Abadiy birga bo'lamiz...</p>
      </motion.div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-pink-500 blur-[150px] opacity-10 animate-pulse" />
      </div>
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="gift" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="z-10 flex flex-col items-center cursor-pointer group" onClick={() => setOpened(true)}>
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2 }} className="text-[140px] drop-shadow-[0_0_60px_rgba(255,29,142,0.5)]">🎁</motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 text-center px-10 text-lg md:text-xl font-serif italic text-pink-100/70 border-b border-white/10 pb-4 max-w-sm">
              {customText}
            </motion.p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.8em] text-pink-500 font-black animate-bounce">Oching ❤️</p>
          </motion.div>
        ) : (
          <motion.div key="ring" initial={{ scale: 0, rotate: -40, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 1, type: "spring", bounce: 0.4 }} className="z-10 flex flex-col items-center text-center">
            <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0], filter: ["drop-shadow(0 0 30px rgba(255,182,193,0.3))", "drop-shadow(0 0 80px rgba(255,215,0,0.9))", "drop-shadow(0 0 30px rgba(255,182,193,0.3))"] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="text-[160px] mb-10">💍</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-3xl md:text-5xl font-serif font-black mb-10 leading-tight text-white max-w-sm">
              va har kuni yana tanlashda davom etaman ❤️
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <p className="text-pink-100/70 mb-16 italic text-lg md:text-2xl font-light italic">Men bilan qolgan butun umringni o'tkazishga rozimisan?</p>
              <button onClick={() => setLoved(true)} className="bg-white text-black px-16 py-5 rounded-full font-black text-2xl tracking-widest shadow-2xl hover:bg-pink-600 hover:text-white">HA ❤️</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DaysCounter() {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const start = new Date("2025-04-17");
    const now = new Date();
    const diff = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
    let current = 0;
    const interval = setInterval(() => {
      current += Math.max(1, Math.floor(diff / 60));
      if (current >= diff) { setDays(diff); clearInterval(interval); } else { setDays(current); }
    }, 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative text-center">
      <h1 className="text-7xl md:text-9xl font-black text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.8)] animate-pulse mb-2">{days}</h1>
      <span className="text-2xl md:text-4xl font-serif text-white opacity-90 tracking-widest italic font-light italic">kun ❤️</span>
    </motion.div>
  );
}

function FloatingHearts({ count = 8 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div key={i} className="absolute text-pink-500 opacity-20" initial={{ y: "110%" }} animate={{ y: "-10%" }} transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }} style={{ left: `${Math.random() * 100}%`, fontSize: `${Math.random() * 20 + 15}px` }}> ❤️ </motion.div>
      ))}
    </div>
  );
}

function Rain() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(80)].map((_, i) => (
        <motion.div key={i} className="absolute w-[1px] h-10 bg-white/20" initial={{ y: "-10%" }} animate={{ y: "110%" }} transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }} style={{ left: Math.random() * 100 + "%" }} />
      ))}
    </div>
  );
}
