"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Pic1 from "../../public/images/paysage-asie.jpg";
import Pic2 from "../../public/images/guerrier-asie.jpg";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import Lenis from "lenis";

// Typage de la référence
export default function Home() {
  const container = useRef<HTMLElement | null>(null); // Typage explicite
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      // Typage explicite du paramètre
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main ref={container} className="relative h-[200vh]">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </main>
  );
}

// Typage des props pour les sections
interface SectionProps {
  scrollYProgress: MotionValue<number>; // Utilise `any` temporairement ou remplace par le type approprié si tu as plus d'informations
}

const Section1 = ({ scrollYProgress }: SectionProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen bg-[#C72626] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh] "
    >
      <div className="font-imperial-script text-white text-8xl font-weight[500]">
        Scroll Perspective
      </div>
      <div className="flex gap-4">
        <p>Section</p>
        <div className="relative w-[12.5vw]">
          <Image src={Pic1} alt="img" placeholder="blur" fill />
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }: SectionProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  return (
    <motion.div style={{ scale, rotate }} className="relative h-screen">
      <Image src={Pic2} alt="img" placeholder="blur" fill />
    </motion.div>
  );
};
