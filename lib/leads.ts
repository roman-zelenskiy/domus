"use client";

/**
 * Фейковое «хранилище заявок» для демо: никакого сервера, всё живёт в localStorage браузера.
 * Любая ошибка доступа (приватный режим, запрет cookies) тихо игнорируется.
 */
export type Lead = { name: string; phone: string; time: string; source: string; createdAt: string };

const KEY = "domus:leads";
const listeners = new Set<() => void>();

function readRaw() {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): Lead[] {
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Имитация отправки: задержка «сети» и запись в localStorage */
export async function submitLead(lead: Omit<Lead, "createdAt">) {
  await new Promise((r) => setTimeout(r, 1100));
  const leads = parse(readRaw());
  leads.push({ ...lead, createdAt: new Date().toISOString() });
  try {
    window.localStorage.setItem(KEY, JSON.stringify(leads.slice(-20)));
  } catch {
    // хранилище недоступно — для демо это не ошибка
  }
  listeners.forEach((l) => l());
}

/* Для useSyncExternalStore: снимок — сырая строка, она стабильна между рендерами */
export const leadsStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    window.addEventListener("storage", l);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", l);
    };
  },
  getSnapshot: readRaw,
  getServerSnapshot: () => "[]",
};

export const lastLead = (raw: string): Lead | undefined => parse(raw).at(-1);
