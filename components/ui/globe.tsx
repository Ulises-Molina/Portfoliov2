"use client"

import type React from "react"

interface GlobeProps {
  size?: number
  className?: string
}

const Globe: React.FC<GlobeProps> = ({ size = 250, className = "" }) => {
  return (
    <>
      <style>
        {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 400px 0; }
          }
        `}
      </style>
      <div
        className={`relative inline-block ${className}`}
        style={{ width: size, height: size }}
      >
        <div
          className="relative rounded-full overflow-hidden w-full h-full"
          style={{
            boxShadow:
              "0 0 20px rgba(255,255,255,0.2), -5px 0 8px #c3f4ff inset, 15px 2px 25px #000 inset, -24px -2px 34px #c3f4ff99 inset, 250px 0 44px #00000066 inset, 150px 0 38px #000000aa inset",
            backgroundImage:
              "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "left",
            animation: "earthRotate 30s linear infinite",
          }}
        />
      </div>
    </>
  )
}

export default Globe
