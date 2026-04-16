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
    
    // Confetti on transitions for WOW effect
    if (scene === 3) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff1d8e", "#ffd700", "#ffffff"],
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

  if (!started) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-black text-white text-center px-6 selection:bg-pink-500/30 overflow-hidden relative">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
           className="z-10 relative"
        >
          <p className="text-pink-200/50 mb-3 uppercase tracking-[0.4em] text-[10px] font-bold">
            2025.04.17 dan beri...
          </p>

          <DaysCounter />

          <p className="mt-8 text-xl md:text-2xl font-serif italic text-pink-50/80 leading-relaxed max-w-sm">
            Barchin bilan o‘tgan har bir kun — men uchun alohida e'tibor ❤️
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

        {/* PERSISTENT AUDIO ELEMENT */}
        <audio ref={audioRef} src="/song1.mp3" loop preload="auto" />

        {/* Subtle Background Hearts (Intro Only) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ 
                opacity: [0, 0.4, 0], 
                y: "-100%",
                x: [0, Math.random() * 50 - 25] 
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute text-pink-500"
              style={{
                left: Math.random() * 100 + "%",
                top: "110%",
                fontSize: Math.random() * 20 + 10 + "px"
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
        
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,60,0.2),transparent_70%)] pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-pink-500/30 relative">
      <audio ref={audioRef} src="/song1.mp3" loop preload="auto" />

      {/* Persistent global particles */}
      <div className="fixed inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.04] z-0" />

      <motion.div 
        key="experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-screen flex flex-col items-center justify-center relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0, x: 50, filter: "blur(20px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -50, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center justify-center"
          >
            {scene < 4 ? (
              <ImageScene img={scenes[scene].img} text={scenes[scene].text} />
            ) : scene === 4 ? (
              /* Gallery Scene as part of the flow */
              <Gallery />
            ) : (
              <Final />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Global Navigation Button */}
        {scene < 5 && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            onClick={next} 
            className="fixed bottom-12 z-50 bg-white/5 backdrop-blur-md px-10 py-3 rounded-full border border-white/10 text-[10px] tracking-[0.5em] uppercase font-black hover:bg-white/10 transition-all active:scale-90 text-pink-200/60"
          >
            Keyingi →
          </motion.button>
        )}
      </div>

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(80,0,80,0.05),transparent_80%)] z-[-1]" />
    </div>
  );
}

/* Dynamic Days Counter Component */
function DaysCounter() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const start = new Date("2025-04-17");
    const now = new Date();
    // Use Math.abs ensure no negative days if clock is slightly off
    const diff = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));

    let current = 0;
    const duration = 2000; // 2 seconds to complete the count
    const increment = Math.max(1, Math.floor(diff / (duration / 30))); // calculation for smooth scrolling

    const interval = setInterval(() => {
      current += increment;
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
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <h1 className="text-6xl md:text-8xl font-black text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.8)] animate-pulse mb-2">
        {days}
      </h1>
      <span className="text-2xl md:text-3xl font-serif text-white opacity-90 tracking-widest italic font-light">
        kun ❤️
      </span>
    </motion.div>
  );
}

/* Image Scene Component */
function ImageScene({ img, text }) {
  return (
    <div className="text-center px-4 w-full max-w-md flex flex-col items-center">
      <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-white/10 mb-12 w-full">
        <motion.img
          src={img}
          className="w-full h-full object-cover shadow-inner"
          initial={{ scale: 1.4, filter: "blur(20px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="text-2xl md:text-3xl font-serif italic text-pink-50/90 leading-relaxed px-4 drop-shadow-lg"
      >
        {text}
      </motion.p>
    </div>
  );
}

/* Gallery Component (Snap Scroll Carousel) */
function Gallery() {
  return (
    <div className="w-full flex flex-col items-center pt-10 px-4">
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-10 text-pink-200/40 uppercase tracking-[0.8em] text-[10px] font-black"
      >
        Bizning shirin xotiralarimiz
      </motion.p>
      <div className="flex overflow-x-auto space-x-6 px-10 w-full snap-x no-scrollbar pb-10">
        {["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg"].map((img, i) => (
          <div 
            key={i}
            className="flex-shrink-0 w-[80%] md:w-80 aspect-[4/5] bg-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden snap-center border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            <img src={img} className="w-full h-full object-cover" alt="Memory" />
          </div>
        ))}
      </div>
      <p className="mt-6 text-[10px] text-white/20 uppercase tracking-[0.3em] font-light italic animate-pulse">O'ngga suring →</p>
    </div>
  );
}

/* FINAL提案 (Proposal Climax) */
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
        ticks: 200
      });
    }
  }, [opened]);

  if (loved) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, type: "spring" }}
        className="text-center px-6"
      >
       <motion.div 
          animate={{ scale: [1, 1.3, 1], filter: ["drop-shadow(0 0 20px rgba(236,72,153,0.5))", "drop-shadow(0 0 50px rgba(236,72,153,1))", "drop-shadow(0 0 20px rgba(236,72,153,0.5))"] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-[12rem] mb-14"
        >
          ❤️
        </motion.div>
        <h1 className="text-6xl md:text-7xl font-serif font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-pink-100 to-pink-500 tracking-tight">
          U ROZI BO'LDI!
        </h1>
        <p className="text-2xl text-pink-200 opacity-80 italic italic tracking-widest uppercase">Abadiy birga bo'lamiz...</p>
      </motion.div>
    );
  }

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-6 pb-20">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="gift"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8, type: "spring" }}
            onClick={() => setOpened(true)}
            className="cursor-pointer group relative flex flex-col items-center"
          >
            <motion.div
              animate={{ 
                rotate: [-4, 4, -4],
                y: [0, -15, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[140px] filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_60px_rgba(255,29,142,0.8)] transition-all duration-500"
            >
              🎁
            </motion.div>
            <p className="text-center text-[11px] uppercase tracking-[0.8em] text-pink-500 font-black mt-8 animate-bounce">Oching ❤️</p>
          </motion.div>
        ) : (
          <motion.div
            key="ring"
            initial={{ scale: 0, rotate: -40, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            className="flex flex-col items-center text-center w-full"
          >
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                filter: ["drop-shadow(0 0 30px rgba(255,182,193,0.3))", "drop-shadow(0 0 70px rgba(255,215,0,0.9))", "drop-shadow(0 0 30px rgba(255,182,193,0.3))"]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-[160px] mb-10"
            >
              💍
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="w-full"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-black mb-10 leading-tight tracking-tighter text-white drop-shadow-2xl">
                Barchin, sen mening tunim, <br/> tundagi nurimsan ❤️
              </h1>
              
              <p className="text-pink-100/70 mb-16 italic text-xl md:text-2xl font-light max-w-lg mx-auto leading-relaxed">
                Men bilan qolgan butun umringni o'tkazishga rozimisan azizam?
              </p>

              <div className="flex gap-6 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "#ec4899" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLoved(true)}
                  className="bg-white text-black px-16 py-5 rounded-[2rem] font-black text-2xl tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 active:bg-pink-600"
                >
                  HA ❤️
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
