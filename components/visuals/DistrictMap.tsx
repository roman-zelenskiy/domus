/** Стилизованная карта района вокруг офиса (Голосеевский р-н, у НСК «Олимпийский») */
export function DistrictMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 280" className={className} role="img" aria-label="Схема проезда: офис Domus на улице Антоновича, 48, рядом с метро Олимпийская">
      <defs>
        <pattern id="map-park" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#8fa070" strokeOpacity=".35" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width="400" height="280" fill="#2a2724" />

      {/* кварталы */}
      <g fill="#33302c">
        {Array.from({ length: 7 }, (_, c) =>
          Array.from({ length: 5 }, (_, r) => (
            <rect key={`${c}-${r}`} x={8 + c * 58} y={8 + r * 56} width="48" height="46" rx="3" />
          )),
        )}
      </g>

      {/* парк и стадион */}
      <rect x="240" y="120" width="106" height="102" rx="6" fill="url(#map-park)" />
      <ellipse cx="293" cy="171" rx="38" ry="30" fill="none" stroke="#f3eee5" strokeOpacity=".25" strokeWidth="1.5" />
      <ellipse cx="293" cy="171" rx="24" ry="17" fill="#f3eee5" fillOpacity=".05" />

      {/* улицы */}
      <g stroke="#f3eee5" strokeLinecap="round" fill="none">
        <path d="M0 116 H400" strokeOpacity=".35" strokeWidth="6" />
        <path d="M230 0 V280" strokeOpacity=".35" strokeWidth="6" />
        <path d="M0 232 L400 196" strokeOpacity=".18" strokeWidth="4" />
        <path d="M110 0 L130 280" strokeOpacity=".18" strokeWidth="4" />
        <path d="M0 58 H400 M0 172 H230 M344 0 V280 M54 0 V280 M172 0 V280" strokeOpacity=".08" strokeWidth="2" />
      </g>

      {/* подписи улиц */}
      <g className="font-mono" fill="#f3eee5" fillOpacity=".5" fontSize="8" letterSpacing=".08em">
        <text x="14" y="110">УЛ. АНТОНОВИЧА</text>
        <text x="236" y="40" transform="rotate(90 236 40)">УЛ. Б. ВАСИЛЬКОВСКАЯ</text>
        <text x="258" y="216" fillOpacity=".4">НСК «ОЛИМПИЙСКИЙ»</text>
        <text x="20" y="248" transform="rotate(-5 20 248)" fillOpacity=".35">УЛ. ЖИЛЯНСКАЯ</text>
      </g>

      {/* метро */}
      <g transform="translate(246 100)">
        <circle r="9" fill="#2f6e4f" />
        <text y="3.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" className="font-sans">M</text>
      </g>
      <text x="258" y="96" className="font-mono" fontSize="7.5" fill="#f3eee5" fillOpacity=".55">ОЛИМПИЙСКАЯ</text>

      {/* офис */}
      <g transform="translate(178 116)">
        <circle r="10" fill="#d88b69" className="origin-center animate-pin-pulse [transform-box:fill-box]" />
        <circle r="7" fill="#d88b69" stroke="#22201d" strokeWidth="2.5" />
        <rect x="-44" y="-40" width="88" height="22" rx="11" fill="#f3eee5" />
        <text y="-25.5" textAnchor="middle" fontSize="9" fontWeight="600" fill="#22201d" className="font-sans">Domus · офис 12</text>
      </g>
    </svg>
  );
}
