import type { RoomFeatures } from "@/lib/room";
import { palette } from "@/lib/room";

/* Изометрическая проекция: x — вправо-вниз, y — влево-вниз, z — вверх */
const S = 34;
const CX = 172;
const CY = 116;
const iso = (x: number, y: number, z: number) => `${CX + (x - y) * 0.866 * S},${CY + (x + y) * 0.5 * S - z * S}`;
const poly = (...pts: [number, number, number][]) => pts.map((p) => iso(...p)).join(" ");

function Box({
  x, y, z = 0, w, d, h, top, left, right,
}: { x: number; y: number; z?: number; w: number; d: number; h: number; top: string; left: string; right: string }) {
  return (
    <g>
      <polygon points={poly([x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h])} fill={left} />
      <polygon points={poly([x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h])} fill={right} />
      <polygon points={poly([x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h])} fill={top} />
    </g>
  );
}

const Layer = ({ show, children }: { show: boolean; children: React.ReactNode }) => (
  <g style={{ opacity: show ? 1 : 0, transition: "opacity .8s cubic-bezier(.22,1,.36,1)" }}>{children}</g>
);

/** SVG-версия комнаты: для мобильных, reduced-motion и слабых устройств */
export function RoomIso({ f, className = "" }: { f: RoomFeatures; className?: string }) {
  const W = 6;
  const D = 5;
  const H = 3;
  const wallBack = palette.wall[f.level];
  const wallSide = palette.wallSide[f.level];
  const floor = palette.floor[f.level];

  return (
    <svg viewBox="0 0 360 320" className={className} role="img" aria-label="Схематичная визуализация комнаты с выбранной отделкой">
      {/* стены: задняя (y=0) и левая (x=0) */}
      <polygon points={poly([0, 0, 0], [W, 0, 0], [W, 0, H], [0, 0, H])} fill={wallBack} style={{ transition: "fill .8s" }} />
      <polygon points={poly([0, 0, 0], [0, D, 0], [0, D, H], [0, 0, H])} fill={wallSide} style={{ transition: "fill .8s" }} />
      <polygon points={poly([0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0])} fill={floor} style={{ transition: "fill .8s" }} />

      {/* доски пола */}
      <g stroke="#000" strokeOpacity=".08" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={iso(0, (i + 1) * 0.5, 0).split(",")[0]} y1={iso(0, (i + 1) * 0.5, 0).split(",")[1]} x2={iso(W, (i + 1) * 0.5, 0).split(",")[0]} y2={iso(W, (i + 1) * 0.5, 0).split(",")[1]} />
        ))}
      </g>

      <Layer show={f.warmFloor}>
        <polygon points={poly([0.3, 0.3, 0], [W - 0.3, 0.3, 0], [W - 0.3, D - 0.3, 0], [0.3, D - 0.3, 0])} fill="#d88b69" opacity=".28" />
      </Layer>

      <Layer show={f.baseboard}>
        <polygon points={poly([0, 0, 0], [W, 0, 0], [W, 0, 0.12], [0, 0, 0.12])} fill="#faf7f1" />
        <polygon points={poly([0, 0, 0], [0, D, 0], [0, D, 0.12], [0, 0, 0.12])} fill="#f1ece3" />
      </Layer>

      <Layer show={f.window}>
        <polygon points={poly([2.2, 0, 1.1], [4.6, 0, 1.1], [4.6, 0, 2.6], [2.2, 0, 2.6])} fill="#2e2b27" />
        <polygon points={poly([2.3, 0, 1.2], [4.5, 0, 1.2], [4.5, 0, 2.5], [2.3, 0, 2.5])} fill="#cfdedd" />
        <polygon points={poly([3.4, 0, 1.2], [3.5, 0, 1.2], [3.5, 0, 2.5], [3.4, 0, 2.5])} fill="#2e2b27" />
      </Layer>

      <Layer show={f.acoustic}>
        {[0.6, 1.3].map((x) => (
          <polygon key={x} points={poly([x, 0, 1.2], [x + 0.55, 0, 1.2], [x + 0.55, 0, 2.4], [x, 0, 2.4])} fill="#cbbba2" />
        ))}
      </Layer>

      <Layer show={f.slats}>
        {Array.from({ length: 9 }, (_, i) => (
          <polygon key={i} points={poly([0, 0.9 + i * 0.32, 0.12], [0, 1.06 + i * 0.32, 0.12], [0, 1.06 + i * 0.32, H], [0, 0.9 + i * 0.32, H])} fill="#a94e34" />
        ))}
      </Layer>

      <Layer show={f.art}>
        <polygon points={poly([4.9, 0, 1.3], [5.7, 0, 1.3], [5.7, 0, 2.3], [4.9, 0, 2.3])} fill="#2e2b27" />
        <polygon points={poly([4.98, 0, 1.38], [5.62, 0, 1.38], [5.62, 0, 2.22], [4.98, 0, 2.22])} fill="#d88b69" />
      </Layer>

      <Layer show={f.ac}>
        <Box x={0} y={3.6} z={2.4} w={0.3} d={1.1} h={0.35} top="#ffffff" left="#f1ece3" right="#e7e1d6" />
      </Layer>

      <Layer show={f.smart}>
        <polygon points={poly([5.3, 0, 1.0], [5.6, 0, 1.0], [5.6, 0, 1.35], [5.3, 0, 1.35])} fill="#22201d" />
        <circle cx={iso(5.45, 0, 1.18).split(",")[0]} cy={iso(5.45, 0, 1.18).split(",")[1]} r="2.5" fill="#d88b69" />
      </Layer>

      <Layer show={f.shelf}>
        <Box x={0} y={0.1} z={1.7} w={0.35} d={0.7} h={0.06} top="#7a5a3a" left="#6b4e32" right="#5e442b" />
        <Box x={0.05} y={0.2} z={1.76} w={0.22} d={0.15} h={0.3} top="#a94e34" left="#8f412b" right="#7d3825" />
      </Layer>

      <Layer show={f.rug}>
        <polygon points={poly([1.4, 1.4, 0.01], [4.6, 1.4, 0.01], [4.6, 3.9, 0.01], [1.4, 3.9, 0.01])} fill="#f3eee5" opacity=".9" />
      </Layer>

      <Layer show={f.sofa}>
        <Box x={1.2} y={0.5} w={3} d={1} h={0.45} top="#8c857b" left="#7a736a" right="#6d675f" />
        <Box x={1.2} y={0.35} w={3} d={0.3} h={0.95} top="#958e84" left="#857e74" right="#766f66" />
        <Box x={1.5} y={0.62} z={0.45} w={0.6} d={0.25} h={0.4} top="#d9cbb4" left="#cbbba2" right="#bfae93" />
        <Box x={3.3} y={0.62} z={0.45} w={0.6} d={0.25} h={0.4} top="#d88b69" left="#c97a59" right="#b86c4c" />
      </Layer>

      <Layer show={f.table}>
        <Box x={2.3} y={2.2} w={1.3} d={0.9} h={0.38} top="#3a342e" left="#2e2b27" right="#26231f" />
      </Layer>

      <Layer show={f.floorLamp}>
        <Box x={4.7} y={0.5} w={0.08} d={0.08} h={1.7} top="#2e2b27" left="#2e2b27" right="#22201d" />
        <Box x={4.5} y={0.35} z={1.7} w={0.45} d={0.45} h={0.35} top="#fff3e0" left="#f1e2c8" right="#e6d4b4" />
      </Layer>

      <Layer show={f.plant}>
        <Box x={5.0} y={3.4} w={0.5} d={0.5} h={0.5} top="#cbbba2" left="#b8a68b" right="#a8957a" />
        <circle cx={iso(5.25, 3.65, 1.05).split(",")[0]} cy={iso(5.25, 3.65, 1.05).split(",")[1]} r="20" fill="#6c7a55" />
        <circle cx={iso(5.1, 3.6, 1.35).split(",")[0]} cy={iso(5.1, 3.6, 1.35).split(",")[1]} r="13" fill="#7d8b63" />
      </Layer>

      <Layer show={f.pendant}>
        <line x1={iso(3, 2, H).split(",")[0]} y1={iso(3, 2, H + 1).split(",")[1]} x2={iso(3, 2, 2.2).split(",")[0]} y2={iso(3, 2, 2.2).split(",")[1]} stroke="#2e2b27" strokeWidth="1" />
        <circle cx={iso(3, 2, 2.05).split(",")[0]} cy={iso(3, 2, 2.05).split(",")[1]} r="11" fill="#fff1d6" />
        <circle cx={iso(3, 2, 2.05).split(",")[0]} cy={iso(3, 2, 2.05).split(",")[1]} r="26" fill="#ffe2b0" opacity=".25" />
      </Layer>
    </svg>
  );
}
