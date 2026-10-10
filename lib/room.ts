import type { ExtraId, PackageId } from "@/content/site";

/** Что показывать в визуализации комнаты для выбранного пакета и опций */
export function roomFeatures(type: PackageId, extras: ExtraId[]) {
  const level = { cosmetic: 1, capital: 2, design: 3 }[type];
  const has = (id: ExtraId) => extras.includes(id) || (type === "design" && (id === "smartHome" || id === "designProject"));
  return {
    level,
    baseboard: level >= 1,
    sofa: level >= 1,
    floorLamp: level >= 1,
    window: level >= 2,
    rug: level >= 2,
    shelf: level >= 2,
    slats: level >= 3,
    pendant: level >= 3,
    plant: level >= 3,
    table: level >= 3,
    art: level >= 3,
    warmFloor: has("warmFloor"),
    acoustic: has("soundproof"),
    ac: has("climate"),
    smart: has("smartHome"),
  };
}

export type RoomFeatures = ReturnType<typeof roomFeatures>;

export const palette = {
  concrete: "#a8a197",
  wall: { 1: "#ece6dc", 2: "#e9e1d4", 3: "#e6dccb" } as Record<number, string>,
  wallSide: { 1: "#ddd5c8", 2: "#d9cfbf", 3: "#d4c7b2" } as Record<number, string>,
  floor: { 1: "#cfb08a", 2: "#bf9566", 3: "#a57a4c" } as Record<number, string>,
};
