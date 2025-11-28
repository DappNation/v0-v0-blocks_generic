"use client"

export function EthbloxLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 1038 1038" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="fill-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#F4E87C" stopOpacity="1">
                <animate attributeName="offset" values="0;1;0" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="0%" stopColor="#F4E87C" stopOpacity="0">
                <animate attributeName="offset" values="0;1;0" dur="2s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>

          {/* Dome with fill animation */}
          <path
            d="M519 0C231.5 0 0 213 0 476C0 476 0 519 519 519C1038 519 1038 476 1038 476C1038 213 806.5 0 519 0Z"
            fill="url(#fill-gradient)"
            className="opacity-30"
          />
          <path
            d="M519 0C231.5 0 0 213 0 476C0 476 0 519 519 519C1038 519 1038 476 1038 476C1038 213 806.5 0 519 0Z"
            stroke="#F4E87C"
            strokeWidth="60"
            fill="none"
          />

          {/* Block outline */}
          <path
            d="M86 519L86 738L519 952L952 738L952 519"
            stroke="#F4E87C"
            strokeWidth="60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M86 738L519 952" stroke="#F4E87C" strokeWidth="60" strokeLinecap="round" />
          <path d="M519 519L519 952" stroke="#F4E87C" strokeWidth="60" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
