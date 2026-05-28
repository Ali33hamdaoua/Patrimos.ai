"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";

/**
 * ContainerScroll : carte 3D qui se redresse au scroll natif (rotateX 20→0,
 * scale, translateY du titre). Pas de hijack — `useScroll` lit la position
 * du conteneur. Adapté à la charte Patrimos : bordure or antique discrète,
 * fond #141414 pour la profondeur, lueur or subtile dans la box-shadow.
 */
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = (): [number, number] =>
    isMobile ? [0.7, 0.9] : [1.05, 1];

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[45rem] items-start justify-center p-2 md:h-[55rem] md:p-20"
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Header : titre + sous-titres au-dessus de la carte.                       */
/* -------------------------------------------------------------------------- */

const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Card : cadre 3D qui se redresse au scroll.                                */
/*  Adaptations Patrimos :                                                    */
/*    - border-2 border-gold/30  (au lieu de border-4 gris)                   */
/*    - bg-[#141414]             (au lieu de bg-[#222222])                    */
/*    - inner bg-surface         (au lieu de bg-zinc-900)                     */
/*    - boxShadow : ombres noires + glow or rgba(201,165,92,0.08)             */
/* -------------------------------------------------------------------------- */

const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003, 0 0 80px rgba(201,165,92,0.08)",
      }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-2 border-gold/30 bg-[#141414] p-2 shadow-2xl md:h-[40rem] md:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-surface md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
