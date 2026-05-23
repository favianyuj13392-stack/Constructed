// app/services/construredApi.ts
// Capa de Servicios Mockeada — simula latencia de red (600ms) para la demo
// En producción, estos métodos se reemplazarán por llamadas reales a Supabase Edge Functions

import type { IGlobalMetrics, IProyecto, IFase } from '../types/construred';
import {
  GLOBAL_METRICS,
  PROJECTS_LIST,
  PILOT_PROJECT_PHASES,
} from '../constants/mockData';

// Utilidad interna: simula latencia de red
const simulateNetwork = <T>(data: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), 600));

/**
 * Retorna las métricas globales del dashboard principal.
 * Pantalla 1 — Tarjetas de control global.
 */
export async function getGlobalMetrics(): Promise<IGlobalMetrics> {
  return simulateNetwork(GLOBAL_METRICS);
}

/**
 * Retorna la lista de proyectos del constructor.
 * Pantalla 1 — Sección "Mis proyectos".
 */
export async function getProjectsList(): Promise<IProyecto[]> {
  return simulateNetwork(PROJECTS_LIST);
}

/**
 * Retorna las 4 fases detalladas del proyecto piloto Casa Familiar - Las Palmas.
 * Pantallas 4, 5, 6 y 7 — Desglose de materiales y comparativa de combos.
 */
export async function getPilotProjectDetails(): Promise<IFase[]> {
  return simulateNetwork(PILOT_PROJECT_PHASES);
}
