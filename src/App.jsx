import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0);

  const audioRef = useRef(null); // song1: Asragin meni

  const start = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(e => console.log("Audio blocked:", e));
    }
    setStarted(true);
  };

  const next = () => {
    setScene(scene + 1);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-pink-500/30 relative">
      
      {/* PERSISTENT AUDIO ELEMENT */}
      <audio ref={audioRef} src="/song1.mp3" loop preload="auto" />

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.04] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(80,0,80,0.05),transparent_80%)] z-[-1]" />

      <AnimatePresence mode="wait">
        {!started ? (
          /* INTRO SCENE */
          <motion.div
             key="intro"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
             transition={{ duration: 1.5 }}
             className="h-screen w-full flex flex-col justify-center items-center text-center px-6 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-pink-200/50 mb-3 uppercase tracking-[0.4em] text-[10px] font-bold">
                2025.04.17 dan beri...
              </p>

              <DaysCounter />

              <p className="mt-8 text-xl md:text-2xl font-serif italic text-pink-50/80 leading-relaxed max-w-sm">
                Barchin bilan o‘tgan har bir kun — men uchun alohida ❤️
              </p>

              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(219,39,119,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={start} 
                className="mt-14 bg-pink-600 hover:bg-pink-500 px-12 py-4 rounded-2xl text-lg font-black tracking-widest uppercase transition-all duration-300"
              >
                Davom et ❤️
              </motion.button>
            </motion.div>

            <FloatingHearts count={10} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,60,0.2),transparent_70%)] pointer-events-none" />
          </motion.div>
        ) : (
          /* CINEMATIC STORY SCENES */
          <motion.div 
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-screen relative z-10"
          >
            <AnimatePresence mode="wait">
              {scene === 0 && (
                /* SCENE 1: MEMORY MOMENT */
                <motion.div
                  key="scene1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(20px)" }}
                  className="relative flex flex-col items-center justify-center min-h-screen w-full px-6 overflow-hidden"
                >
                  <FloatingHearts count={8} />

                  <motion.div
                    className="relative max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.img
                      src="/img1.jpg"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </motion.div>

                  <motion.p
                    className="mt-10 text-center text-xl md:text-2xl font-serif italic text-white px-4 leading-relaxed tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    Barchin…
                    <br />
                    balki bu eng birinchi rasm emasdir,
                    <br />
                    lekin men uchun eng qadrli onlardan biri ❤️
                  </motion.p>
                </motion.div>
              )}

              {scene === 1 && (
                /* SCENE 2: CHAT MOMENT */
                <motion.div
                  key="scene2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6"
                >
                  <motion.img 
                    src="/img2.jpg" 
                    className="w-64 md:w-80 rounded-[2rem] mb-10 shadow-2xl border border-white/10"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  />

                  <div className="flex flex-col space-y-4 w-full max-w-xs">
                    <motion.div
                      className="bg-gray-800 p-4 rounded-2xl rounded-tl-none self-start text-sm md:text-base border border-white/5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Salom 🙂
                    </motion.div>

                    <motion.div
                      className="bg-pink-600 p-4 rounded-2xl rounded-tr-none self-end text-sm md:text-base shadow-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      Salom 🙂
                    </motion.div>
                  </div>

                  <motion.p
                    className="mt-10 text-center text-xl md:text-2xl font-serif italic text-pink-50/90 px-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    Barchin… o‘sha payt oddiy yozishma edi, 
                    lekin bilmagandim — hammasi shundan boshlanishini…
                  </motion.p>
                </motion.div>
              )}

              {scene === 2 && (
                /* SCENE 3: HAPPY MOMENTS (GALLERY) */
                <motion.div
                  key="scene3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden"
                >
                  <FloatingFlowers />

                  <motion.div
                    className="flex space-x-6 overflow-x-auto px-10 w-full snap-x no-scrollbar pb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {["/img3.jpg", "/img4.jpg", "/img5.jpg"].map((img, i) => (
                      <motion.div 
                        key={i}
                        className="flex-shrink-0 w-72 md:w-80 aspect-[4/5] rounded-[2.5rem] overflow-hidden snap-center border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2 }}
                      >
                        <img src={img} className="w-full h-full object-cover" alt="Happy Moment" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p
                    className="mt-10 text-center px-10 text-xl md:text-3xl font-serif italic text-white drop-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    Baxt nima ekanligini so‘rashsa…
                    <br />
                    men seni bilan kulgan paytlarimni ko‘rsatardim ❤️
                  </motion.p>
                  
                  <p className="mt-4 text-[10px] text-white/20 uppercase tracking-widest animate-pulse">O'ngga suring →</p>
                </motion.div>
              )}

              {scene === 3 && (
                /* SCENE 4: TRIALS (RAIN) */
                <motion.div
                  key="scene4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden"
                >
                  <Rain />

                  <motion.div
                    className="relative max-w-sm aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-white/10 z-10"
                  >
                    <motion.img
                      src="/img4.jpg"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 3 }}
                    />
                    <div className="absolute inset-0 bg-black/70 rounded-2xl" />
                  </motion.div>

                  <motion.p
                    className="mt-10 text-center text-xl md:text-3xl font-serif italic text-gray-300 px-6 leading-relaxed relative z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Barchin… hammasi har doim ham oson bo‘lmagan,
                    <br />
                    lekin seni yo‘qotish hech qachon variant bo‘lmagan ❤️
                  </motion.p>
                </motion.div>
              )}

              {scene === 4 && (
                /* SCENE 5: FINAL PROPOSAL */
                <motion.div 
                  key="scene5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full w-full"
                >
                  <Final />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Global Navigation Button */}
            {scene < 4 && (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                onClick={next} 
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

/* Helper Components */

function DaysCounter() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const start = new Date("2025-04-17");
    const now = new Date();
    const diff = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));

    let current = 0;
    const interval = setInterval(() => {
      current += Math.max(1, Math.floor(diff / 60));
      if (current >= diff) {
        setDays(diff);
        clearInterval(interval);
      } else {
        setDays(current);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative text-center">
      <h1 className="text-7xl md:text-9xl font-black text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.8)] animate-pulse mb-2">
        {days}
      </h1>
      <span className="text-2xl md:text-4xl font-serif text-white opacity-90 tracking-widest italic font-light italic">kun ❤️</span>
    </motion.div>
  );
}

function FloatingHearts({ count = 8 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-500 opacity-20"
          initial={{ y: "110%" }}
          animate={{ y: "-10%" }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
          style={{ left: `${Math.random() * 100}%`, fontSize: `${Math.random() * 20 + 15}px` }}
        > ❤️ </motion.div>
      ))}
    </div>
  );
}

function FloatingFlowers() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-200/30 text-3xl"
          initial={{ y: "-10%", rotate: 0 }}
          animate={{ y: "110%", rotate: 360, x: [0, 50, -50, 0] }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          style={{ left: `${Math.random() * 100}%` }}
        > 🌸 </motion.div>
      ))}
    </div>
  );
}

function Rain() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] h-10 bg-white/20"
          initial={{ y: "-10%" }}
          animate={{ y: "110%" }}
          transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
          style={{ left: Math.random() * 100 + "%" }}
        />
      ))}
    </div>
  );
}

function Final() {
  const [opened, setOpened] = useState(false);
  const [loved, setLoved] = useState(false);

  useEffect(() => {
    if (opened) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ff1d8e", "#ffd700", "#ffffff"],
      });
    }
  }, [opened]);

  if (loved) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-screen text-center px-6">
       <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-9xl mb-14">❤️</motion.div>
        <h1 className="text-5xl md:text-7xl font-serif font-black mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-pink-500">U ROZI BO'LDI!</h1>
        <p className="text-2xl text-pink-200 opacity-80 uppercase tracking-widest italic font-light italic">Abadiy birga bo'lamiz...</p>
      </motion.div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="gift" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }} onClick={() => setOpened(true)} className="cursor-pointer group flex flex-col items-center">
            <motion.div animate={{ rotate: [-4, 4, -4], y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-[120px] drop-shadow-[0_0_50px_rgba(255,29,142,0.4)]">🎁</motion.div>
            <p className="text-[11px] uppercase tracking-[0.6em] text-pink-500 font-black mt-8 animate-bounce">Oching ❤️</p>
          </motion.div>
        ) : (
          <motion.div key="ring" initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} className="flex flex-col items-center text-center">
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0], filter: ["drop-shadow(0 0 20px rgba(255,182,193,0.3))", "drop-shadow(0 0 50px rgba(255,215,0,0.8))", "drop-shadow(0 0 20px rgba(255,182,193,0.3))"] }} transition={{ repeat: Infinity, duration: 3 }} className="text-[140px] mb-10">💍</motion.div>
            <h1 className="text-4xl md:text-6xl font-serif font-black mb-8 leading-tight tracking-tighter text-white">Barchin, sen mening tunim, <br/> tundagi nurimsan ❤️</h1>
            <p className="text-pink-100/70 mb-14 italic text-lg md:text-2xl">Men bilan qolgan butun umringni o'tkazishga rozimisan azizam?</p>
            <button onClick={() => setLoved(true)} className="bg-white text-black px-16 py-5 rounded-full font-black text-2xl tracking-widest shadow-2xl transition-all hover:bg-pink-500 hover:text-white">HA ❤️</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
