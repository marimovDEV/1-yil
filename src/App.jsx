import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0);

  const audio1 = useRef(null); // song1: Asragin meni
  const audio2 = useRef(null); // song2: Sen mening sirim

  const start = () => {
    if (audio1.current) {
      audio1.current.muted = false;
      audio1.current.volume = 0.4;
      audio1.current.play().catch(e => console.log("Audio blocked:", e));
    }
    setStarted(true);
  };

  const next = () => {
    if (scene === 3) switchMusic();
    setScene(scene + 1);
  };

  const switchMusic = () => {
    const a1 = audio1.current;
    const a2 = audio2.current;
    if (!a1 || !a2) return;

    // Fade out a1
    let vol1 = a1.volume;
    const fadeOut = setInterval(() => {
      if (vol1 > 0.05) {
        vol1 -= 0.05;
        a1.volume = Math.max(0, vol1);
      } else {
        clearInterval(fadeOut);
        a1.pause();
        
        // Fade in a2
        a2.volume = 0;
        a2.play().catch(e => console.log("Audio 2 blocked:", e));
        let vol2 = 0;
        const fadeIn = setInterval(() => {
          if (vol2 < 0.5) {
            vol2 += 0.05;
            a2.volume = Math.min(0.5, vol2);
          } else {
            clearInterval(fadeIn);
          }
        }, 200);
      }
    }, 200);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-pink-500/30">
      
      {/* PERSISTENT AUDIO ELEMENTS */}
      <audio ref={audio1} src="/song1.mp3" loop preload="auto" />
      <audio ref={audio2} src="/song2.mp3" loop preload="auto" />

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="h-screen w-full flex flex-col justify-center items-center text-center px-6 relative"
          >
            <TypingText text="Bugun biz 1 yil bo‘ldik..." />
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              onClick={start} 
              className="mt-12 bg-pink-600 hover:bg-pink-500 px-10 py-4 rounded-2xl text-xl font-bold shadow-[0_10px_40px_rgba(219,39,119,0.3)] transition-all active:scale-95"
            >
              Bos ❤️
            </motion.button>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,60,0.1),transparent_70%)] pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div 
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-screen flex flex-col items-center justify-center relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={scene}
                initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -100, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: "anticipate" }}
                className="w-full flex flex-col items-center justify-center pt-10"
              >
                {scene === 0 && <ImageScene img="/img1.jpg" text="Hammasi shu kundan boshlangan edi..." />}
                {scene === 1 && <ImageScene img="/img2.jpg" text="Senga yozgan birinchi xabarimni hali ham eslayman..." />}
                {scene === 2 && <RainScene />}
                {scene === 3 && <Gallery />}
                {scene === 4 && <Final />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Button */}
            {scene < 4 && (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={next} 
                className="fixed bottom-12 z-50 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 text-xs tracking-[0.5em] uppercase font-bold hover:bg-white/20 transition-all active:scale-90"
              >
                Keyingi →
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(80,0,80,0.05),transparent_80%)] z-[-1]" />
    </div>
  );
}

/* Typing effect */
function TypingText({ text }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, [text]);

  return <h1 className="text-3xl md:text-5xl font-serif text-pink-50 drop-shadow-lg">{display}</h1>;
}

/* Image Scene */
function ImageScene({ img, text }) {
  return (
    <div className="text-center px-4 w-full max-w-md">
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 mb-10">
        <motion.img
          src={img}
          className="w-full h-full object-cover"
          initial={{ scale: 1.3, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-xl md:text-2xl font-serif italic text-pink-100/90 leading-relaxed px-6"
      >
        {text}
      </motion.p>
    </div>
  );
}

/* Rain Scene (Premium CSS Rain) */
function RainScene() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center px-10 text-2xl md:text-3xl font-serif italic text-gray-300 relative z-10 drop-shadow-2xl"
      >
        "Hammasi ham oson bo‘lmadi..."
      </motion.p>

      {/* Visual Rain Drops */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: Math.random() * 0.5 + 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
            className="absolute bg-white/40 w-[1px] h-12"
            style={{
              left: Math.random() * 100 + "%",
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
    </div>
  );
}

/* Gallery (Snap Scroll Carousel) */
function Gallery() {
  return (
    <div className="w-full flex flex-col items-center">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-pink-200/50 uppercase tracking-[0.6em] text-[10px] font-bold"
      >
        Eng baxtli lahzalar
      </motion.h2>
      <div className="flex overflow-x-auto space-x-6 px-10 w-full snap-x no-scrollbar pb-10">
        {["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg"].map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="flex-shrink-0 w-72 aspect-[4/5] bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden snap-center border border-white/10 shadow-2xl"
          >
            <img src={img} className="w-full h-full object-cover" alt="Gallery" />
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/30 animate-pulse">O'ngga suring →</p>
    </div>
  );
}

/* FINAL提案 (ULTRA CLIMAX) */
function Final() {
  const [opened, setOpened] = useState(false);
  const [loved, setLoved] = useState(false);

  useEffect(() => {
    if (opened) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff1d8e", "#ffd700", "#ffffff"],
      });
    }
  }, [opened]);

  if (loved) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center px-6"
      >
       <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-9xl mb-10"
        >
          ❤️
        </motion.div>
        <h1 className="text-5xl font-serif font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-pink-500">
          U ROZI BO'LDI!
        </h1>
        <p className="text-xl text-pink-200 opacity-80 italic">Abadiy birga bo'lamiz...</p>
      </motion.div>
    );
  }

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-6 pb-20">
      <AnimatePresence>
        {!opened ? (
          <motion.div
            key="gift"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpened(true)}
            className="cursor-pointer group relative"
          >
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[120px] filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(255,29,142,0.6)] transition-all"
            >
              🎁
            </motion.div>
            <p className="text-center text-[10px] uppercase tracking-[0.5em] text-pink-500 mt-4 animate-bounce">Oching ❤️</p>
          </motion.div>
        ) : (
          <motion.div
            key="ring"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
                filter: ["drop-shadow(0 0 20px rgba(255,255,255,0.3))", "drop-shadow(0 0 60px rgba(255,215,0,0.8))", "drop-shadow(0 0 20px rgba(255,255,255,0.3))"]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-[140px] mb-6"
            >
              💍
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight tracking-tighter">
                Sen mening tunim, <br/> tundagi nurimsan ❤️
              </h1>
              
              <p className="text-pink-200/60 mb-12 italic text-lg">Men bilan qolgan umringni o'tkazishga rozimisan?</p>

              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setLoved(true)}
                  className="bg-white text-black px-12 py-4 rounded-2xl font-black text-xl hover:bg-pink-500 hover:text-white transition-all shadow-2xl"
                >
                  HA ❤️
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
