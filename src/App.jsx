import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0);

  const audioRef = useRef(null); 

  // User-triggered start to bypass mobile autoplay blocks
  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.error("Playback failed:", e));
    }
    setStarted(true);
  };

  const nextScene = () => {
    setScene(scene + 1);
    
    // Small confetti burst on each scene transition for "WOW"
    if (scene < 4) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ["#ff1d8e", "#ffffff"]
      });
    }

    // Big explosion on the way to final scene
    if (scene === 4) {
       confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ffb6c1", "#ff1493", "#ffffff"]
      });
    }
  };

  const scenes = [
    { img: "/img1.jpg", text: "Hammasi shu kundan boshlangan edi..." },
    { img: "/img2.jpg", text: "Senga yozgan birinchi xabarimni hali ham eslayman..." },
    { img: "/img3.jpg", text: "Biz ko‘p kuldik, ko‘p xotiralar yig‘dik..." },
    { img: "/img4.jpg", text: "Ba'zida qiyin bo‘ldi, lekin hech qachon taslim bo‘lmadik..." },
    { img: "/img5.jpg", text: "Va bugun... biz hali ham birgamiz ❤️" }
  ];

  return (
    <div className="relative bg-black text-white min-h-screen flex flex-col items-center selection:bg-pink-500/30 overflow-hidden font-sans">
      
      {/* 
        CRITICAL: Audio element must be outside conditional blocks 
        to ensure it stays mounted and continues playing when 'started' state changes.
      */}
      <audio ref={audioRef} src="/song1.mp3" loop preload="auto" />

      {!started ? (
        /* Intro Section */
        <div className="h-screen w-full flex flex-col justify-center items-center text-center px-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="z-10"
          >
            <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Bugun biz 1 yil bo‘ldik...
            </h1>
            
            <p className="text-gray-400 mb-12 font-light tracking-widest text-sm uppercase">
              Hammasi shu kundan boshlangan edi
            </p>

            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(236,72,153,0.6)" }}
              whileTap={{ scale: 0.9 }}
              onClick={startExperience}
              className="bg-pink-600 hover:bg-pink-500 px-14 py-5 rounded-2xl text-xl font-black shadow-2xl transition-all duration-500 active:bg-pink-700"
            >
              Bos ❤️
            </motion.button>
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,60,0.2),transparent_70%)] pointer-events-none" />
        </div>
      ) : (
        /* Cinematic Experience Section */
        <div className="w-full max-w-lg flex flex-col items-center pt-8 md:pt-12 px-4 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0, filter: "blur(30px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(30px)", scale: 1.1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              {scene < 5 ? (
                <div className="flex flex-col items-center w-full">
                  <div className="w-full aspect-[4/5] relative shadow-[0_40px_80px_rgba(0,0,0,0.9)] rounded-[2.5rem] overflow-hidden border border-white/10 group">
                    <img 
                      src={scenes[scene].img} 
                      className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" 
                      alt="Memory"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                  
                  <div className="mt-14 text-center px-4 min-h-[120px] flex items-center justify-center">
                    <p className="text-2xl md:text-4xl font-serif italic text-white leading-snug drop-shadow-2xl">
                       {scenes[scene].text}
                    </p>
                  </div>
                </div>
              ) : (
                <Final />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Minimalist Navigation */}
          {scene < 5 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={nextScene}
              className="mt-16 text-pink-500/60 hover:text-pink-400 transition-all duration-700 tracking-[0.5em] text-[10px] uppercase font-black py-4 px-8 border-b border-pink-900/30"
            >
              Davom etish →
            </motion.button>
          )}
        </div>
      )}

      {/* Global Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(100,0,50,0.2),transparent_80%)]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
    </div>
  );
}

function Final() {
  useEffect(() => {
    const end = Date.now() + 30 * 1000;

    (function frame() {
      // Pink and Gold sparkles
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#ff1493", "#ffd700", "#ffffff"]
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#ff0000", "#ffd700", "#ffffff"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="text-center mt-12 py-10 flex flex-col items-center w-full min-h-[70vh] justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-[10rem] mb-16 drop-shadow-[0_0_60px_rgba(255,20,147,0.6)]"
      >
        ❤️
      </motion.div>

      <motion.h1 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="text-6xl md:text-7xl font-serif font-black mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-pink-100 to-pink-500 tracking-tighter"
      >
        Men seni yaxshi ko‘raman 
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="space-y-6"
      >
        <p className="text-gray-500 font-light tracking-[0.8em] uppercase text-[9px]">
          Abadiy birga bo'lish tilagi bilan
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent mx-auto mt-12" />
      </motion.div>
    </div>
  );
}
