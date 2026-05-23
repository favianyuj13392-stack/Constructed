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
  totalMercadoUSD: number; // totalMercadoBs * 6.96 (regla visual estricta)
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
// Constante del factor de conversión visual (PRD: multiplicación directa)
// ─────────────────────────────────────────────────────────────────────────────
const TC_FACTOR = 6.96;

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
      const cantidadCalculada = parseFloat((item.rendimientoM2 * areaM2).toFixed(4));
      
      // Paso B: Totales del Ítem
      const totalMercadoBs = cantidadCalculada * item.precioMercadoBs;
      
      // Paso C: Combos
      const totalComboBs = cantidadCalculada * (item.precioComboBs ?? item.precioMercadoBs);
      
      // Paso D: Ahorro y USD
      const ahorroBs = totalMercadoBs - totalComboBs;
      const totalMercadoUSD = totalMercadoBs * TC_FACTOR;

      const calcMat: ICalculatedMaterial = {
        id: item.id,
        descripcion: item.descripcion,
        unidad: item.unidad,
        precioUnitarioBs: item.precioMercadoBs,
        cantidad: parseFloat(cantidadCalculada.toFixed(2)),
        precioComboBs: item.precioComboBs,
        totalMercadoBs,
        totalMercadoUSD,
        totalComboBs,
        ahorroBs,
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
