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
 * Retorna métricas globales calculadas dinámicamente desde la lista real de proyectos.
 */
export async function getGlobalMetrics(): Promise<IGlobalMetrics> {
  const proyectos = await getProjectsList();

  const proyectosTotales = proyectos.length;

  const conPresupuesto = proyectos.filter((p) => p.estado === 'Presupuesto generado');
  const presupuestosGenerados = conPresupuesto.length;

  // Ahorro estimado por proyecto: piloto usa valor real, dinámicos usan areaM2 * 4.5
  const ahorroTotalEstimadoBs = conPresupuesto.reduce((acc, p) => {
    if (p.id === 'proj-001') return acc + 868; // Piloto: valor calculado real
    return acc + Math.round((p.areaM2 || 0) * 4.5);
  }, 0);

  const cashbackProyectadoBs = Math.round(ahorroTotalEstimadoBs * 0.25);

  return { proyectosTotales, presupuestosGenerados, ahorroTotalEstimadoBs, cashbackProyectadoBs };
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

/**
 * Actualiza un proyecto en Supabase con fallback a localStorage.
 */
export async function updateProject(id: string, dataToUpdate: Partial<IProyecto>): Promise<IProyecto> {
  // Intentar en Supabase primero
  try {
    const { data, error } = await supabase.from('proyectos').update(dataToUpdate).eq('id', id).select().single();
    if (!error && data) {
      // Sincronizar localStorage si existe ahí
      if (typeof window !== 'undefined') {
        const localProjects = getLocalProjects();
        const index = localProjects.findIndex((p) => p.id === id);
        if (index !== -1) {
          localProjects[index] = { ...localProjects[index], ...dataToUpdate };
          localStorage.setItem(LOCAL_KEY, JSON.stringify(localProjects));
        }
      }
      return data as IProyecto;
    }
  } catch (error) {
    console.error("Supabase update error:", error);
  }

  // Fallback a localStorage
  let updatedProject: IProyecto | null = null;
  if (typeof window !== 'undefined') {
    const localProjects = getLocalProjects();
    const index = localProjects.findIndex((p) => p.id === id);
    if (index !== -1) {
      localProjects[index] = { ...localProjects[index], ...dataToUpdate };
      updatedProject = localProjects[index];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(localProjects));
    }
  }

  if (updatedProject) return updatedProject;

  // Si no está en local ni se pudo actualizar, retornamos un mock para que no rompa
  return { id, nombre: 'Proyecto actualizado', ubicacion: '', areaM2: 0, pisos: 0, estado: 'Borrador', ...dataToUpdate } as IProyecto;
}

/**
 * Elimina un proyecto por su ID en Supabase y localStorage.
 */
export async function deleteProject(id: string): Promise<void> {
  // Intentar en Supabase
  try {
    await supabase.from('proyectos').delete().eq('id', id);
  } catch (error) {
    console.error("Supabase delete error:", error);
  }

  // Siempre borrar del localStorage si existe
  if (typeof window !== 'undefined') {
    const localProjects = getLocalProjects();
    const filtered = localProjects.filter((p) => p.id !== id);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered));
  }
}
