import { useEffect, useRef, useState } from "react";

const effects = {
  fade: "opacity-0",
  "fade-up": "opacity-0 translate-y-8",
  "fade-down": "opacity-0 -translate-y-8",
  "fade-left": "opacity-0 translate-x-8",
  "fade-right": "opacity-0 -translate-x-8",
  zoom: "opacity-0 scale-95",
  "zoom-in": "opacity-0 scale-90",
  "zoom-out": "opacity-0 scale-110",
  rotate: "opacity-0 rotate-6",
  flip: "opacity-0 rotateX-90",
};

export default function Reveal({
  children,
  className = "",
  effect = "fade-up",
  delay = 0,
  duration = 1000,
  once = true,
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setShow(false);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={`
        transition-all ease-out
        ${show ? "opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0" : effects[effect]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
