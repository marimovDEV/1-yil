import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0);

  const audio1 = useRef(null); // background

  useEffect(() => {
    if (started && audio1.current) {
      audio1.current.volume = 0.4;
      audio1.current.play();
    }
  }, [started]);

  const nextScene = () => {
    setScene(scene + 1);
  };

  if (!started) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-black text-white text-center px-6">
        <h1 className="text-2xl mb-6">
          Bugun biz 1 yil bo‘ldik...
        </h1>

        <button
          onClick={() => setStarted(true)}
          className="bg-pink-500 px-6 py-3 rounded-xl text-lg"
        >
          Bos ❤️
        </button>

        <audio ref={audio1} src="/song1.mp3" loop />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-4 py-6 flex flex-col items-center">

      {/* SCENE */}
      {scene === 0 && (
        <Scene img="/img1.jpg" text="Hammasi shu kundan boshlangan edi..." />
      )}

      {scene === 1 && (
        <Scene img="/img2.jpg" text="Senga yozgan birinchi xabarimni hali ham eslayman..." />
      )}

      {scene === 2 && (
        <Scene img="/img3.jpg" text="Biz ko‘p kuldik, ko‘p xotiralar yig‘dik..." />
      )}

      {scene === 3 && (
        <Scene img="/img4.jpg" text="Ba'zida qiyin bo‘ldi, lekin hech qachon taslim bo‘lmadik..." />
      )}

      {scene === 4 && (
        <Scene img="/img5.jpg" text="Va bugun... biz hali ham birgamiz ❤️" />
      )}

      {scene === 5 && (
        <Final />
      )}

      {/* NEXT BUTTON */}
      {scene < 5 && (
        <button
          onClick={nextScene}
          className="mt-6 bg-pink-500 px-6 py-3 rounded-xl"
        >
          Keyingi →
        </button>
      )}
    </div>
  );
}

function Scene({ img, text }) {
  return (
    <motion.div
      className="w-full max-w-md flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative p-2 bg-white/10 backdrop-blur-md rounded-3xl mb-8 shadow-[0_0_40px_rgba(236,72,153,0.2)] border border-white/20"
        whileHover={{ scale: 1.02, rotate: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img 
          src={img} 
          className="rounded-2xl w-full h-auto object-cover max-h-[55vh]" 
          alt="memory"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </motion.div>
      <motion.p 
        className="text-center text-lg font-light tracking-wide text-white/90 px-4 leading-relaxed drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

function Final() {
  return (
    <motion.div
      className="text-center mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl mb-4">
        Men seni yaxshi ko‘raman ❤️
      </h1>
      <p className="text-lg">
        Bu hali boshlanishi xolos...
      </p>
    </motion.div>
  );
}
