// app/services/construredApi.ts
// Capa de Servicios — Persistencia resiliente con localStorage + Supabase
// BUG-003 Fix: Los proyectos sobreviven a recargas de página

import type { IGlobalMetrics, IProyecto, IFase } from '../types/construred';
import {
  GLOBAL_METRICS,
  PROJECTS_LIST,
  PILOT_PROJECT_PHASES,
} from '../constants/mockData';
import { supabase } from '../lib/supabaseClient';

// ─────────────────────────────────────────────────────────────────────────────
// Capa de persistencia local (localStorage) — SSR-safe
// ─────────────────────────────────────────────────────────────────────────────
const LOCAL_KEY = 'construred_projects';

function getLocalProjects(): IProyecto[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalProject(proyecto: IProyecto): void {
  if (typeof window === 'undefined') return;
  const existing = getLocalProjects();
  existing.unshift(proyecto);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
}

// Utilidad interna: simula latencia de red
const simulateNetwork = <T>(data: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), 600));

/**
 * Retorna las métricas globales del dashboard principal.
 */
export async function getGlobalMetrics(): Promise<IGlobalMetrics> {
  return GLOBAL_METRICS;
}

/**
 * Retorna la lista de proyectos (Supabase → localStorage → estáticos)
 */
export async function getProjectsList(): Promise<IProyecto[]> {
  const localProjects = getLocalProjects();

  try {
    const { data, error } = await supabase.from('proyectos').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return [...(data as IProyecto[]), ...localProjects, ...PROJECTS_LIST];
  } catch {
    // Fallback silencioso: localStorage + estáticos
    return [...localProjects, ...PROJECTS_LIST];
  }
}

/**
 * Retorna las 4 fases detalladas del proyecto piloto.
 */
export async function getPilotProjectDetails(): Promise<IFase[]> {
  return simulateNetwork(PILOT_PROJECT_PHASES);
}

/**
 * Crea un proyecto nuevo en Supabase con fallback a localStorage.
 */
export async function createProject(proyectoData: Partial<IProyecto>): Promise<IProyecto> {
  const newProject: IProyecto = {
    id: `proj-${Date.now()}`,
    nombre: proyectoData.nombre || 'Nuevo Proyecto',
    ubicacion: proyectoData.ubicacion || 'Sin ubicación',
    areaM2: Number(proyectoData.areaM2) || 0,
    pisos: Number(proyectoData.pisos) || 1,
    estado: proyectoData.estado || 'Presupuesto generado',
  };

  try {
    const { data, error } = await supabase.from('proyectos').insert(newProject).select().single();
    if (error) throw error;
    // También guardar en localStorage para resiliencia
    saveLocalProject(data as IProyecto);
    return data as IProyecto;
  } catch {
    // Fallback: persistir en localStorage (sobrevive a recargas)
    saveLocalProject(newProject);
    return newProject;
  }
}

/**
 * Retorna un proyecto específico por ID.
 * Orden de búsqueda: localStorage → estáticos → Supabase
 */
export async function getProjectById(id: string): Promise<IProyecto | null> {
  // 1. Búsqueda en localStorage (proyectos dinámicos del usuario)
  const localProjects = getLocalProjects();
  const fromLocal = localProjects.find((p) => p.id === id);
  if (fromLocal) {
    return fromLocal;
  }

  // 2. Búsqueda en array estático o caso piloto legacy
  const staticProject = PROJECTS_LIST.find(
    (p) => p.id === id || (id === 'las-palmas' && p.id === 'proj-001')
  );
  if (staticProject) {
    return staticProject;
  }

  // 3. Búsqueda en Supabase
  try {
    const { data, error } = await supabase.from('proyectos').select('*').eq('id', id).single();
    if (error) throw error;
    return data as IProyecto;
  } catch {
    return null;
  }
}
