import React from 'react';

export default function RedCurtain() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-red-800 via-red-700 to-red-900" />
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
        <defs>
          <pattern id="curtain" x="0" y="0" width="80" height="100%" patternUnits="userSpaceOnUse">
            <path d="M0,0 Q20,50 0,100 M40,0 Q60,50 40,100 M80,0 Q100,50 80,100" 
              fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#curtain)" />
      </svg>
    </div>
  );
}
