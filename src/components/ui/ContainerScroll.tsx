"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  className = "",
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.95] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <div
      className={cn("h-[50rem] md:h-[65rem] flex items-center justify-center relative p-4 md:p-12", className)}
      ref={containerRef}
      style={{ perspective: "1200px" }}
    >
      <div
        className="w-full relative py-8 md:py-20"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: any }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center mb-10"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
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
          "0 0 #0000004d, 0 10px 25px rgba(0,0,0,0.5), 0 40px 40px rgba(0,0,0,0.4), 0 90px 60px rgba(0,0,0,0.3)",
        transformStyle: "preserve-3d",
      }}
      className="max-w-5xl -mt-4 mx-auto h-[26rem] md:h-[35rem] w-full border border-stone/20 p-2 md:p-4 bg-void/90 rounded-[24px] shadow-2xl backdrop-blur-md"
    >
      <div className="h-full w-full overflow-hidden rounded-[18px] bg-void relative">
        {children}
      </div>
    </motion.div>
  );
};

export default ContainerScroll;
