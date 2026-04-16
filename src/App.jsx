import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0);

  const audio1 = useRef(null); // song1: Asragin meni
  const audio2 = useRef(null); // song2: Sen mening sirim

  // User-triggered start to bypass mobile autoplay blocks
  const startExperience = () => {
    const a1 = audio1.current;
    if (a1) {
      a1.muted = false;
      a1.volume = 0.4;
      a1.play().then(() => {
        console.log("Playback started successfully");
      }).catch((e) => {
        console.error("Playback failed:", e);
      });
    }
    setStarted(true);
  };

  const nextScene = () => {
    if (scene === 4) {
      switchMusic();
    }
    setScene(scene + 1);
  };

  const switchMusic = () => {
    const a1 = audio1.current;
    const a2 = audio2.current;

    if (!a1 || !a2) return;

    // Fade out audio1
    let vol1 = 0.4;
    const fadeOut = setInterval(() => {
      if (vol1 > 0.05) {
        vol1 -= 0.05;
        a1.volume = vol1;
      } else {
        clearInterval(fadeOut);
        a1.pause();
        
        // Start audio2 with fade in
        a2.volume = 0;
        a2.play().catch(e => console.log("Audio 2 blocked:", e));
        
        let vol2 = 0;
        const fadeIn = setInterval(() => {
          if (vol2 < 0.5) {
            vol2 += 0.05;
            a2.volume = vol2;
          } else {
            clearInterval(fadeIn);
          }
        }, 200);
      }
    }, 200);

    // Initial heart explosion on music switch
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff1d8e", "#ff85c1"],
    });
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
      
      {/* PERSISTENT AUDIO ELEMENTS - Must stay mounted to keep playing */}
      <audio ref={audio1} src="/song1.mp3" loop preload="auto" />
      <audio ref={audio2} src="/song2.mp3" loop preload="auto" />

      {/* Intro Screen */}
      {!started ? (
        <div className="h-screen w-full flex flex-col justify-center items-center text-center px-6 transition-all duration-1000">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="z-10"
          >
            <h1 className="text-3xl md:text-5xl font-serif mb-4 tracking-tight text-pink-50">
              Bugun biz 1 yil bo‘ldik...
            </h1>
            
            <p className="text-gray-400 mb-10 font-light tracking-wide text-sm md:text-base">
              Hammasi shu kundan boshlangan edi
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startExperience}
              className="bg-pink-600 hover:bg-pink-500 px-12 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-pink-900/40 transition-all duration-300 active:bg-pink-700"
            >
              Bos ❤️
            </motion.button>
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,60,0.15),transparent_70%)] pointer-events-none" />
        </div>
      ) : (
        /* Main Content */
        <div className="w-full max-w-lg flex flex-col items-center pt-10 px-4 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              {scene < 5 ? (
                <div className="flex flex-col items-center w-full">
                  <div className="w-full aspect-[4/5] relative shadow-2xl shadow-black/80 rounded-3xl overflow-hidden border border-white/5">
                    <img 
                      src={scenes[scene].img} 
                      className="w-full h-full object-cover transition-transform duration-1000" 
                      alt="Memory"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 text-center text-2xl md:text-3xl font-serif italic text-pink-50 leading-relaxed drop-shadow-lg"
                  >
                    {scenes[scene].text}
                  </motion.p>
                </div>
              ) : (
                <Final />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {scene < 5 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={nextScene}
              className="mt-16 group flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-500 tracking-[0.4em] text-[10px] uppercase font-bold"
            >
              Davom etish
              <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
            </motion.button>
          )}
        </div>
      )}

      {/* Global subtle background elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(80,0,80,0.1),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
    </div>
  );
}

function Final() {
  useEffect(() => {
    const end = Date.now() + 20 * 1000;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 45,
        origin: { x: 0, y: 0.7 },
        colors: ["#ff1d8e", "#ffffff"]
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 45,
        origin: { x: 1, y: 0.7 },
        colors: ["#ff0000", "#ffffff"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="text-center mt-12 py-10 flex flex-col items-center w-full">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-9xl mb-14 drop-shadow-[0_0_40px_rgba(255,29,142,0.5)]"
      >
        ❤️
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="text-5xl md:text-6xl font-serif font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-pink-100 to-pink-500 tracking-tight"
      >
        Men seni yaxshi ko‘raman 
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.5 }}
        className="text-pink-200/50 font-light tracking-[0.5em] uppercase text-[10px]"
      >
        Umrbod birga bo'laylik
      </motion.p>
    </div>
  );
}
