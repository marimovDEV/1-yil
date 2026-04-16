import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingElements from "./components/FloatingElements";

export default function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioRef = useRef(null);

  const startExperience = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch(err => console.log("Audio play failed:", err));
    }
  };

  const nextScene = () => {
    if (scene === 4) {
      // Trigger heart confetti explosion for the final scene
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff0000', '#ff69b4'] });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff0000', '#ff69b4'] });
      }, 250);
    }
    setScene(scene + 1);
  };

  const scenes = [
    { img: "/img1.jpg", text: "Hammasi shu kundan boshlangan edi..." },
    { img: "/img2.jpg", text: "Senga yozgan birinchi xabarimni hali ham eslayman..." },
    { img: "/img3.jpg", text: "Biz ko‘p kuldik, ko‘p xotiralar yig‘dik..." },
    { img: "/img4.jpg", text: "Ba'zida qiyin bo‘ldi, lekin hech qachon taslim bo‘lmadik..." },
    { img: "/img5.jpg", text: "Va bugun... biz hali ham birgamiz ❤️" }
  ];

  if (!started) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-black text-white text-center px-6 overflow-hidden relative">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="relative z-10"
        >
          <h1 className="text-4xl font-serif mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-600 drop-shadow-lg">
            Bugun biz 1 yil bo‘ldik...
          </h1>
          <button
            onClick={startExperience}
            className="group relative bg-pink-600 hover:bg-pink-500 px-10 py-4 rounded-full text-xl font-bold shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
          >
            Bos ❤️
          </button>
        </motion.div>
        
        {/* Subtle background glow for intro */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,60,0.2),transparent_70%)]" />
        
        <audio ref={audioRef} src="/song1.mp3" loop />
        <FloatingElements />
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white min-h-screen px-4 py-8 flex flex-col items-center overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(80,0,80,0.15),transparent_70%)] pointer-events-none z-0" />
      
      <FloatingElements />

      {/* Music Status Indicator */}
      <motion.div 
        className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
        animate={{ opacity: isAudioPlaying ? 1 : 0.5 }}
      >
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium">Song: Asragin Meni</span>
      </motion.div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full flex flex-col items-center"
          >
            {scene < 5 ? (
              <SceneContent data={scenes[scene]} />
            ) : (
              <Final />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {scene < 5 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={nextScene}
            className="mt-12 bg-white/10 hover:bg-white/20 backdrop-blur-md px-10 py-4 rounded-full border border-white/20 shadow-xl text-xs tracking-[0.4em] uppercase active:scale-90 transition-all font-bold text-pink-200"
          >
            Davom etish
          </motion.button>
        )}
      </div>
      
      <audio ref={audioRef} src="/song1.mp3" loop />
    </div>
  );
}

function SceneContent({ data }) {
  return (
    <div className="w-full max-w-md flex flex-col items-center pt-6">
      <motion.div
        className="relative group w-[90%] aspect-[4/5] p-2 bg-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: "backOut" }}
      >
        <img 
          src={data.img} 
          className="rounded-[2.3rem] w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000" 
          alt="memory"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle decorative ring */}
        <div className="absolute inset-0 border-[1px] border-white/5 rounded-[2.3rem] pointer-events-none m-2" />
      </motion.div>
      
      <div className="mt-12 text-center px-6 min-h-[100px] flex items-center justify-center">
        <p className="text-2xl font-serif italic tracking-wide text-white/95 leading-relaxed drop-shadow-lg">
          {data.text.split(" ").map((word, i) => (
            <motion.span
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
               className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </div>
  );
}

function Final() {
  useEffect(() => {
    // Continuous heart sparkles on final scene
    const duration = 20 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#ff0000', '#ff69b4', '#ffffff']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#ff1493', '#ffc0cb', '#ffd700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <motion.div
      className="text-center mt-12 px-6 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
    >
      <div className="relative mb-16">
        <motion.div
          animate={{ 
            scale: [1, 1.25, 1],
            boxShadow: [
              "0 0 0px rgba(236,72,153,0)", 
              "0 0 80px rgba(236,72,153,0.8)", 
              "0 0 0px rgba(236,72,153,0)"
            ]
          }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="text-9xl relative z-10"
        >
          ❤️
        </motion.div>
        
        {/* Animated aura behind the heart */}
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-pink-500 rounded-full blur-3xl -z-10"
        />
      </div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="text-5xl font-serif mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-pink-200 to-pink-500 font-bold tracking-tight"
      >
        Men seni yaxshi ko‘raman 
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="space-y-4"
      >
        <p className="text-xl text-pink-100 font-light italic opacity-80">
          Sen mening dunyoyimsan...
        </p>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent mx-auto mt-8" />
        <p className="text-[10px] text-white/30 font-light tracking-[0.5em] uppercase pt-4">
          Unutib bo'lmas 1 yil
        </p>
      </motion.div>
    </motion.div>
  );
}
