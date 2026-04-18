import type { DiseasePrediction, Gender } from "@/lib/dummyData";

export const STORAGE_KEY = "dps_prediction_v1";

export interface PredictionSessionPayload {
  symptoms: string[];
  age: number;
  gender: Gender;
  predictions: DiseasePrediction[];
  createdAt: string;
}

export function savePredictionSession(payload: PredictionSessionPayload): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota / private mode
  }
}

export function loadPredictionSession(): PredictionSessionPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PredictionSessionPayload;
  } catch {
    return null;
  }
}

export function clearPredictionSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
