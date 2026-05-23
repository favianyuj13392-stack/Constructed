// app/services/construredApi.ts
// Capa de Servicios
// Integración con Supabase y fallback a persistencia estática local

import type { IGlobalMetrics, IProyecto, IFase } from '../types/construred';
import {
  GLOBAL_METRICS,
  PROJECTS_LIST,
  PILOT_PROJECT_PHASES,
} from '../constants/mockData';
import { supabase } from '../lib/supabaseClient';

// Utilidad interna: simula latencia de red
const simulateNetwork = <T>(data: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), 600));

/**
 * Retorna las métricas globales del dashboard principal.
 */
export async function getGlobalMetrics(): Promise<IGlobalMetrics> {
  return simulateNetwork(GLOBAL_METRICS);
}

/**
 * Retorna la lista de proyectos del constructor (Mezcla de DB y local)
 */
export async function getProjectsList(): Promise<IProyecto[]> {
  try {
    const { data, error } = await supabase.from('proyectos').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return [...(data as IProyecto[]), ...PROJECTS_LIST];
  } catch (err) {
    // Fallback silencioso
    return simulateNetwork(PROJECTS_LIST);
  }
}

/**
 * Retorna las 4 fases detalladas del proyecto piloto.
 */
export async function getPilotProjectDetails(): Promise<IFase[]> {
  return simulateNetwork(PILOT_PROJECT_PHASES);
}

/**
 * Crea un proyecto nuevo en Supabase con fallback a memoria local.
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
    return data as IProyecto;
  } catch (err) {
    console.warn('Supabase fallback: guardando en memoria local', err);
    PROJECTS_LIST.unshift(newProject); // Fallback a estado local
    return newProject;
  }
}

/**
 * Retorna un proyecto específico por ID.
 */
export async function getProjectById(id: string): Promise<IProyecto | null> {
  // Búsqueda en memoria local o caso piloto
  const localProject = PROJECTS_LIST.find((p) => p.id === id || (id === 'las-palmas' && p.id === 'proj-001'));
  if (localProject) {
    return simulateNetwork(localProject);
  }

  // Búsqueda en DB
  try {
    const { data, error } = await supabase.from('proyectos').select('*').eq('id', id).single();
    if (error) throw error;
    return data as IProyecto;
  } catch (err) {
    console.warn(`Proyecto ${id} no encontrado en Supabase`);
    return null;
  }
}
