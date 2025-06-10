'use client';
import React, { ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spothlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spothlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  return (
    <div
      className={`relative rounded-3xl bg-white/5 backdrop-blur-xl shadow-md overflow-hidden p-3 ${className}`}
    >
      {/* Top right corner glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: "520px",
          height: "520px",
          background: `radial-gradient(circle at 100% 0%, ${spothlightColor}, transparent 45%)`,
          opacity: 0.35,
          zIndex: 1,
        }}
      />
      {/* Optional: Inner shadow for depth */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          boxShadow: 'inset 0 4px 24px 0 rgba(0,0,0,0.18), inset 0 1.5px 8px 0 rgba(0,0,0,0.10)',
          zIndex: 1,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;



/*

'use client';
import React, { useRef, useState, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spothlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spothlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.4);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.4);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl bg-white/5 backdrop-blur-xl shadow-md overflow-hidden p-3 ${className}`}
      // border border-white/5

    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spothlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;

*/