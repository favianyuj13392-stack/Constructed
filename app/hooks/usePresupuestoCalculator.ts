'use client';

// app/hooks/usePresupuestoCalculator.ts
// Motor de Cálculo Matemático — Separación estricta de responsabilidades
// REGLA VISUAL: USD = Bs * 6.96 (multiplicación directa, NO división)

import { useState, useEffect } from 'react';
import type { IFase, IMaterial } from '../types/construred';

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

// ─────────────────────────────────────────────────────────────────────────────
// Lógica pura de cálculo (sin efectos secundarios)
// ─────────────────────────────────────────────────────────────────────────────

function calcularMaterial(material: IMaterial): ICalculatedMaterial {
  const totalMercadoBs = material.precioUnitarioBs * material.cantidad;
  const totalComboBs = (material.precioComboBs ?? material.precioUnitarioBs) * material.cantidad;
  const ahorroBs = totalMercadoBs - totalComboBs;
  const totalMercadoUSD = totalMercadoBs * TC_FACTOR; // Regla visual estricta

  return {
    ...material,
    totalMercadoBs,
    totalMercadoUSD,
    totalComboBs,
    ahorroBs,
  };
}

function calcularFase(fase: IFase): ICalculatedFase {
  const materialesCalculados = fase.materiales.map(calcularMaterial);

  const subtotalMercadoBs = materialesCalculados.reduce(
    (acc, m) => acc + m.totalMercadoBs,
    0
  );
  const subtotalComboBs = materialesCalculados.reduce(
    (acc, m) => acc + m.totalComboBs,
    0
  );
  const ahorroFaseBs = subtotalMercadoBs - subtotalComboBs;

  return {
    ...fase,
    materiales: materialesCalculados,
    subtotalMercadoBs,
    subtotalComboBs,
    ahorroFaseBs,
  };
}

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

export default function usePresupuestoCalculator(fasesBase: IFase[]): IUsePresupuesto {
  const [fasesCalculadas, setFasesCalculadas] = useState<ICalculatedFase[]>([]);
  const [totales, setTotales] = useState<IPresupuestoTotals>({
    granTotalMercadoBs: 0,
    granTotalComboBs: 0,
    granAhorroBs: 0,
  });
  const [isCalculating, setIsCalculating] = useState<boolean>(true);

  useEffect(() => {
    if (!fasesBase || fasesBase.length === 0) return;

    setIsCalculating(true);

    // Cálculo síncrono inmediato; el setTimeout de 800ms simula el
    // "pensamiento" de la IA (retardo visual para la demo del MVP)
    const fases = fasesBase.map(calcularFase);
    const totalesGlobales = calcularTotalesGlobales(fases);

    const timer = setTimeout(() => {
      setFasesCalculadas(fases);
      setTotales(totalesGlobales);
      setIsCalculating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [fasesBase]);

  return { fasesCalculadas, totales, isCalculating };
}
