// Dotted map of Punjab with one glowing marker per branch (About page).

const outline: [number, number][] = [
  [555, 90], [905, 90], [925, 150], [975, 150], [1040, 190], [1045, 260], [1090, 300],
  [1115, 360], [1110, 430], [1050, 450], [1050, 500], [980, 510], [945, 580], [900, 605],
  [800, 600], [740, 610], [715, 660], [700, 610], [640, 570], [520, 555], [390, 545],
  [400, 480], [380, 445], [430, 375], [470, 320], [520, 275], [560, 250], [540, 225], [545, 150],
];

const markers: [number, number][] = [
  [731, 262], [912, 313], [578, 359], [900, 413], [676, 466], [860, 492],
];

function inside(x: number, y: number) {
  let hit = false;
  for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
    const [xi, yi] = outline[i];
    const [xj, yj] = outline[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const STEP = 12;
const dots: [number, number][] = [];
for (let y = 90; y <= 660; y += STEP) {
  for (let x = 380; x <= 1116; x += STEP) {
    if (inside(x, y)) dots.push([x, y]);
  }
}

export default function PunjabMap() {
  return (
    <svg viewBox="360 70 780 610" className="mx-auto w-full max-w-[820px]" role="img" aria-label="Map of Punjab showing 6 OZMO branches">
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4.6} fill="#1d1d10" stroke="#3a3a1c" strokeWidth={0.9} />
      ))}
      {markers.map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={7}
            fill="#ede734"
            className="animate-pulse-dot [transform-box:fill-box] [transform-origin:center]"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <circle cx={x} cy={y} r={6} fill="#ede734" />
        </g>
      ))}
    </svg>
  );
}
