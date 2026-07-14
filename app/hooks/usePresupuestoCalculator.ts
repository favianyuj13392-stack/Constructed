'use client';

// app/hooks/usePresupuestoCalculator.ts
// Motor de Cálculo Matemático — Separación estricta de responsabilidades
// REGLA VISUAL: BOB = USD * 6.96 (multiplicación directa, NO división)

import { useState, useEffect } from 'react';
import type { IFase, IMaterial } from '../types/construred';
import { CATALOGO_MATERIALES } from '../lib/catalogoMaestro';

// ─────────────────────────────────────────────────────────────────────────────
// Contratos de tipos de salida del motor
// ─────────────────────────────────────────────────────────────────────────────

export interface ICalculatedMaterial extends IMaterial {
  totalMercadoBs: number;
  totalComboBs: number;
  ahorroBs: number;
}

export interface ICalculatedFase extends Omit<IFase, 'materiales'> {
  materiales: ICalculatedMaterial[];
  subtotalMercadoBs: number;
  subtotalComboBs: number;
  ahorroFaseBs: number;
}

export interface IPresupuestoTotals {
  granTotalMercadoBs: number;
  granTotalComboBs: number;
  granAhorroBs: number;
}

export interface IUsePresupuesto {
  fasesCalculadas: ICalculatedFase[];
  totales: IPresupuestoTotals;
  isCalculating: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
const FASES_BASE = ['PRIMERA FASE', 'SEGUNDA FASE', 'TERCERA FASE', 'CUARTA FASE'];
const FASES_DESC: Record<string, string> = {
  'PRIMERA FASE': 'Obras Preliminares',
  'SEGUNDA FASE': 'Estructura Portante',
  'TERCERA FASE': 'Obra Gruesa',
  'CUARTA FASE': 'Obra Fina y Terminaciones',
};

// ─────────────────────────────────────────────────────────────────────────────
// Lógica pura de cálculo (sin efectos secundarios)
// ─────────────────────────────────────────────────────────────────────────────

function calcularTotalesGlobales(fasesCalculadas: ICalculatedFase[]): IPresupuestoTotals {
  const granTotalMercadoBs = fasesCalculadas.reduce(
    (acc, f) => acc + f.subtotalMercadoBs,
    0
  );
  const granTotalComboBs = fasesCalculadas.reduce(
    (acc, f) => acc + f.subtotalComboBs,
    0
  );
  const granAhorroBs = granTotalMercadoBs - granTotalComboBs;

  return { granTotalMercadoBs, granTotalComboBs, granAhorroBs };
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook principal exportado
// ─────────────────────────────────────────────────────────────────────────────

export default function usePresupuestoCalculator(areaM2: number, pisos: number = 1): IUsePresupuesto {
  const [fasesCalculadas, setFasesCalculadas] = useState<ICalculatedFase[]>([]);
  const [totales, setTotales] = useState<IPresupuestoTotals>({
    granTotalMercadoBs: 0,
    granTotalComboBs: 0,
    granAhorroBs: 0,
  });
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // ── Guard Clause: datos inválidos → estado seguro inmediato ──────────────
  const isInvalidArea = !areaM2 || isNaN(areaM2) || areaM2 <= 0;

  useEffect(() => {
    if (isInvalidArea) {
      setFasesCalculadas([]);
      setTotales({ granTotalMercadoBs: 0, granTotalComboBs: 0, granAhorroBs: 0 });
      setIsCalculating(false);
      return;
    }

    setIsCalculating(true);

    const fasesMap = new Map<string, ICalculatedMaterial[]>();

    CATALOGO_MATERIALES.forEach(item => {
      // Paso A: Cantidades
      const cantidad = item.rendimientoM2 * areaM2;
      
      // Paso B: Totales del Ítem
      const totalMercadoBs = cantidad * item.precioMercadoBs;
      
      // Paso C: Combos
      const isComboActive = item.precioComboBs !== undefined;
      const totalComboBs = Number((cantidad * (isComboActive ? item.precioComboBs! : item.precioMercadoBs)).toFixed(2));
      const ahorroBs = Number((totalMercadoBs - totalComboBs).toFixed(2));

      const calcMat: ICalculatedMaterial = {
        id: item.id,
        descripcion: item.descripcion,
        unidad: item.unidad,
        precioUnitarioBs: item.precioMercadoBs,
        precioComboBs: isComboActive ? item.precioComboBs : undefined,
        cantidad: Number(cantidad.toFixed(2)),
        totalMercadoBs,
        totalComboBs,
        ahorroBs,
        subMateriales: item.subMateriales,
      };

      if (!fasesMap.has(item.fase)) {
        fasesMap.set(item.fase, []);
      }
      fasesMap.get(item.fase)!.push(calcMat);
    });

    const fases = FASES_BASE.map((faseNombre, idx) => {
      const materiales = fasesMap.get(faseNombre) || [];
      const subtotalMercadoBs = materiales.reduce((acc, m) => acc + m.totalMercadoBs, 0);
      const subtotalComboBs = materiales.reduce((acc, m) => acc + m.totalComboBs, 0);
      const ahorroFaseBs = subtotalMercadoBs - subtotalComboBs;

      return {
        id: `fase-0${idx + 1}`,
        nombre: faseNombre,
        descripcion: FASES_DESC[faseNombre],
        materiales,
        subtotalMercadoBs,
        subtotalComboBs,
        ahorroFaseBs,
      };
    });

    const totalesGlobales = calcularTotalesGlobales(fases);

    setFasesCalculadas(fases);
    setTotales(totalesGlobales);
    setIsCalculating(false);
  }, [areaM2, pisos, isInvalidArea]);

  return { fasesCalculadas, totales, isCalculating };
}
