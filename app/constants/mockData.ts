// src/constants/mockData.ts
// Capa de persistencia estática (solo lectura) — Proyecto Piloto: Casa Familiar - Las Palmas
// T/C Presentación: Valor_USD = Valor_Bs * 6.96 (multiplicación directa, NO división)

import type { IGlobalMetrics, IProyecto, IFase } from '../types/construred';

// ─────────────────────────────────────────────────────────────────────────────
// MÉTRICAS GLOBALES DEL DASHBOARD (PRD §3, Pantalla 1)
// ─────────────────────────────────────────────────────────────────────────────
export const GLOBAL_METRICS: IGlobalMetrics = {
  proyectosTotales: 8,
  presupuestosGenerados: 5,
  ahorroTotalEstimadoBs: 34500,
  cashbackProyectadoBs: 8500,
};

// ─────────────────────────────────────────────────────────────────────────────
// LISTA DE PROYECTOS (PRD §3, Pantalla 1 — "Mis Proyectos")
// ─────────────────────────────────────────────────────────────────────────────
export const PROJECTS_LIST: IProyecto[] = [
  {
    id: 'proj-001',
    nombre: 'Casa Familiar - Las Palmas',
    ubicacion: 'Santa Cruz',
    areaM2: 191,
    pisos: 2,
    estado: 'Presupuesto generado',
  },
  {
    id: 'proj-002',
    nombre: 'Ampliación - Oficina Central',
    ubicacion: 'Cochabamba',
    areaM2: 120,
    pisos: 1,
    estado: 'En análisis',
  },
  {
    id: 'proj-003',
    nombre: 'Local Comercial - Equipetrol',
    ubicacion: 'Santa Cruz',
    areaM2: 95,
    pisos: 1,
    estado: 'En carga',
  },
  {
    id: 'proj-004',
    nombre: 'Casa de Campo - Warnes',
    ubicacion: 'Warnes',
    areaM2: 220,
    pisos: 1,
    estado: 'Borrador',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FASES DEL PROYECTO PILOTO — Casa Familiar Las Palmas (proj-001)
// PRD §3: Pantalla 4 (Fase I), Pantalla 6 (Fases II, III, IV), Pantalla 7 (Combos)
// ─────────────────────────────────────────────────────────────────────────────
export const PILOT_PROJECT_PHASES: IFase[] = [
  // ── PRIMERA FASE: Obras Preliminares ──────────────────────────────────────
  // Presupuesto mercado: Bs 49.389 | Combo: Bs 49.080 | Ahorro: Bs 309
  {
    id: 'fase-01',
    nombre: 'PRIMERA FASE',
    descripcion: 'Obras Preliminares',
    materiales: [
      {
        id: 'mat-01-01',
        descripcion: 'INSTALACIÓN DE FAENAS',
        unidad: 'glb',
        precioUnitarioBs: 2517.41,
        cantidad: 1.0,
        // Sin precioComboBs: no hay descuento en este ítem
      },
      {
        id: 'mat-01-02',
        descripcion: 'NIVELACIÓN DE TERRENO (no clasificado)',
        unidad: 'm²',
        precioUnitarioBs: 4.82,
        cantidad: 95.4,
        precioComboBs: 1.58, // Ahorro: Bs 309 (P.U. optimizado Bs 1.58 vs Bs 4.82)
      },
      {
        id: 'mat-01-03',
        descripcion: 'TRAZADO Y REPLANTEO',
        unidad: 'm²',
        precioUnitarioBs: 1.29,
        cantidad: 95.4,
        // Sin precioComboBs: no hay descuento en este ítem
      },
    ],
  },

  // ── SEGUNDA FASE: Estructura Portante ─────────────────────────────────────
  // Presupuesto mercado: Bs 37.646,64 | Combo: Bs 37.110 | Ahorro: Bs 536
  {
    id: 'fase-02',
    nombre: 'SEGUNDA FASE',
    descripcion: 'Estructura Portante',
    materiales: [
      {
        id: 'mat-02-01',
        descripcion: 'HORMIGÓN ARMADO PARA ZAPATAS',
        unidad: 'm³',
        precioUnitarioBs: 1500.0,
        cantidad: 2.5,
        precioComboBs: 1285.60, // Ahorro: Bs 536 (Fierro/Cemento optimizado)
      },
      {
        id: 'mat-02-02',
        descripcion: 'COLUMNAS DE HORMIGÓN ARMADO',
        unidad: 'm³',
        precioUnitarioBs: 1600.0,
        cantidad: 1.0,
        // Sin precioComboBs: no hay descuento en este ítem
      },
      {
        id: 'mat-02-03',
        descripcion: 'VIGAS DE CONEXIÓN Y RIOSTRAS',
        unidad: 'm³',
        precioUnitarioBs: 1450.0,
        cantidad: 0.04,
        // Sin precioComboBs: no hay descuento en este ítem
      },
    ],
  },

  // ── TERCERA FASE: Obra Gruesa ──────────────────────────────────────────────
  // Presupuesto mercado: Bs 663.851,76 | Combo: Bs 663.827 | Ahorro: Bs 24
  {
    id: 'fase-03',
    nombre: 'TERCERA FASE',
    descripcion: 'Obra Gruesa',
    materiales: [
      {
        id: 'mat-03-01',
        descripcion: 'MURO DE LADRILLO DE 6 HUECOS',
        unidad: 'm²',
        precioUnitarioBs: 52.0,
        cantidad: 1200.0,
        precioComboBs: 51.98, // Ahorro: Bs 24 (P.U. optimizado Bs 51.98 vs Bs 52.00)
      },
      {
        id: 'mat-03-02',
        descripcion: 'REVOQUE EXTERIOR GRUESO',
        unidad: 'm²',
        precioUnitarioBs: 35.0,
        cantidad: 1019.0,
        // Sin precioComboBs: no hay descuento en este ítem
      },
      {
        id: 'mat-03-03',
        descripcion: 'VIGAS DE CORONACIÓN',
        unidad: 'm³',
        precioUnitarioBs: 240.0,
        cantidad: 30.0,
        // Sin precioComboBs: no hay descuento en este ítem
      },
    ],
  },

  // ── CUARTA FASE: Obra Fina y Terminaciones ────────────────────────────────
  // Presupuesto mercado: Bs 1.728.585,60 | Combo: Bs 1.728.585 | Ahorro: Bs 0
  // Sin combos activos (acabados altamente personalizados)
  {
    id: 'fase-04',
    nombre: 'CUARTA FASE',
    descripcion: 'Obra Fina y Terminaciones',
    materiales: [
      {
        id: 'mat-04-01',
        descripcion: 'PISO PORCELANATO 60x60',
        unidad: 'm²',
        precioUnitarioBs: 120.0,
        cantidad: 191.0,
        // Sin precioComboBs: sin combos activos en esta fase
      },
      {
        id: 'mat-04-02',
        descripcion: 'CIELO FALSO DE YESO',
        unidad: 'm²',
        precioUnitarioBs: 45.0,
        cantidad: 191.0,
        // Sin precioComboBs: sin combos activos en esta fase
      },
      {
        id: 'mat-04-03',
        descripcion: 'PINTURA LÁTEX INTERIOR',
        unidad: 'm²',
        precioUnitarioBs: 22.0,
        cantidad: 800.0,
        // Sin precioComboBs: sin combos activos en esta fase
      },
    ],
  },
];
