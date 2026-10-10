/**
 * План двухкомнатной квартиры 64 м² для анимации в hero.
 * Все линии используют pathLength=1 — GSAP прорисовывает их через stroke-dashoffset.
 * Классы bp-* — точки входа для таймлайна.
 */
const line = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1, fill: "none", vectorEffect: "non-scaling-stroke" as const };

export function FloorPlan({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" className={className} role="img" aria-label="План квартири 64 м²: спальня, вітальня, кухня та санвузол">
      <defs>
        <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-terracotta)" strokeWidth="1.2" strokeOpacity=".22" />
        </pattern>
        <pattern id="hatch-sand" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="var(--color-graphite)" strokeWidth=".8" strokeOpacity=".12" />
        </pattern>
      </defs>

      {/* Заливки комнат */}
      <g className="bp-fill" style={{ opacity: 0 }}>
        <rect x="50" y="60" width="160" height="200" fill="url(#hatch)" />
        <rect x="210" y="60" width="140" height="200" fill="var(--color-sand)" fillOpacity=".55" />
        <rect x="50" y="260" width="100" height="180" fill="url(#hatch-sand)" />
        <rect x="150" y="260" width="200" height="180" fill="var(--color-sand)" fillOpacity=".35" />
      </g>

      {/* Стены */}
      <g stroke="currentColor" strokeLinecap="square">
        <path className="bp-wall" {...line} strokeWidth="5" d="M300 440 H50 V60 H350 V440 H340" />
        <path className="bp-wall" {...line} strokeWidth="3" d="M50 260 H110 M150 260 H250 M290 260 H350" />
        <path className="bp-wall" {...line} strokeWidth="3" d="M210 60 V260" />
        <path className="bp-wall" {...line} strokeWidth="3" d="M150 260 V380 M150 420 V440" />
      </g>

      {/* Окна */}
      <g className="bp-win" style={{ opacity: 0 }}>
        {[
          [90, 56, 70, 8],
          [250, 56, 70, 8],
          [346, 300, 8, 70],
          [46, 110, 8, 80],
        ].map(([x, y, w, h], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill="var(--color-paper)" />
            <rect x={x} y={y} width={w} height={h} fill="none" stroke="currentColor" strokeWidth="1" />
            {w > h ? (
              <line x1={x} x2={x + w} y1={y + h / 2} y2={y + h / 2} stroke="currentColor" strokeWidth=".8" />
            ) : (
              <line x1={x + w / 2} x2={x + w / 2} y1={y} y2={y + h} stroke="currentColor" strokeWidth=".8" />
            )}
          </g>
        ))}
      </g>

      {/* Двери: створка + дуга открывания */}
      <g stroke="currentColor" strokeWidth="1">
        <path className="bp-open" {...line} d="M110 260 V220 A40 40 0 0 1 150 260" />
        <path className="bp-open" {...line} d="M290 260 V220 A40 40 0 0 0 250 260" />
        <path className="bp-open" {...line} d="M150 420 H190 A40 40 0 0 0 150 380" />
        <path className="bp-open" {...line} d="M340 440 V400 A40 40 0 0 0 300 440" />
      </g>

      {/* Размерные линии */}
      <g stroke="var(--color-terracotta)" strokeWidth=".9">
        <path className="bp-dim" {...line} d="M50 34 H350 M50 28 V40 M350 28 V40 M210 30 V38" />
        <path className="bp-dim" {...line} d="M24 60 V440 M18 60 H30 M18 440 H30 M20 260 H28" />
        <path className="bp-dim" {...line} d="M50 466 H150 M50 460 V472 M150 460 V472" />
      </g>
      <g className="font-mono" fill="var(--color-terracotta)" fontSize="9" letterSpacing=".05em">
        <text className="bp-label" x="130" y="27" textAnchor="middle" style={{ opacity: 0 }}>3 840</text>
        <text className="bp-label" x="280" y="27" textAnchor="middle" style={{ opacity: 0 }}>3 360</text>
        <text className="bp-label" x="14" y="160" textAnchor="middle" transform="rotate(-90 14 160)" style={{ opacity: 0 }}>4 800</text>
        <text className="bp-label" x="14" y="350" textAnchor="middle" transform="rotate(-90 14 350)" style={{ opacity: 0 }}>4 320</text>
        <text className="bp-label" x="100" y="484" textAnchor="middle" style={{ opacity: 0 }}>2 400</text>
      </g>

      {/* Мебель */}
      <g stroke="currentColor" strokeWidth=".9" strokeOpacity=".75">
        {/* кровать */}
        <path className="bp-furn" {...line} d="M75 82 H175 V196 H75 Z M83 90 H122 V108 H83 Z M128 90 H167 V108 H128 Z M75 130 H175" />
        <path className="bp-furn" {...line} d="M180 84 H202 V104 H180 Z M180 174 H202 V194 H180 Z" />
        {/* гостиная: диван, столик, ковёр, ТВ */}
        <path className="bp-furn" {...line} d="M218 96 H250 V214 H218 Z M226 104 H250 V206 H226" />
        <path className="bp-furn" {...line} d="M262 112 H322 V198 H262 Z" />
        <path className="bp-furn" {...line} d="M292 135 m-18 0 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0" />
        <path className="bp-furn" {...line} d="M336 104 H346 V200 H336 Z" />
        {/* санузел: ванна, раковина, унитаз */}
        <path className="bp-furn" {...line} d="M56 268 H98 V360 H56 Z M64 276 H90 V352 H64 Z" />
        <path className="bp-furn" {...line} d="M126 292 m-11 0 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0" />
        <path className="bp-furn" {...line} d="M66 404 H90 V412 H66 Z M78 412 m-9 0 a9 12 0 1 0 18 0 a9 12 0 1 0 -18 0" />
        {/* кухня: столешница, плита, стол со стульями */}
        <path className="bp-furn" {...line} d="M318 268 H344 V384 H318 Z M331 294 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 M331 320 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" />
        <path className="bp-furn" {...line} d="M235 330 m-26 0 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0" />
        <path className="bp-furn" {...line} d="M227 286 H243 V298 H227 Z M227 362 H243 V374 H227 Z M191 322 H203 V338 H191 Z M267 322 H279 V338 H267 Z" />
      </g>

      {/* Подписи помещений */}
      <g className="font-mono" fill="currentColor" fontSize="8" letterSpacing=".12em">
        <g className="bp-label" style={{ opacity: 0 }}>
          <text x="58" y="218">СПАЛЬНЯ</text>
          <text x="58" y="230" fill="var(--color-terracotta)">14,2 м²</text>
        </g>
        <g className="bp-label" style={{ opacity: 0 }}>
          <text x="262" y="84">ВІТАЛЬНЯ</text>
          <text x="262" y="96" fill="var(--color-terracotta)">19,6 м²</text>
        </g>
        <g className="bp-label" style={{ opacity: 0 }}>
          <text x="104" y="336">С/В</text>
          <text x="104" y="348" fill="var(--color-terracotta)">6,1 м²</text>
        </g>
        <g className="bp-label" style={{ opacity: 0 }}>
          <text x="204" y="410">КУХНЯ</text>
          <text x="204" y="422" fill="var(--color-terracotta)">17,4 м²</text>
        </g>
        <g className="bp-label" style={{ opacity: 0 }}>
          <text x="320" y="462" textAnchor="middle" fill="var(--color-stone)">ВХІД</text>
        </g>
      </g>
    </svg>
  );
}
