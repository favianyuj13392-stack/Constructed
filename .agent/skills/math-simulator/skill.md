---
name: math-simulator
description: Orquesta y calcula dinámicamente las fórmulas de ahorro financiero para cualquier proyecto del sistema.
---

# Skill_Math_Simulator

## Reglas de Cálculo Dinámico
1. **Consumo de Datos**: Extrae siempre los valores base (`costoOriginal` y `costoCombo`) directamente desde el proyecto activo en el archivo `mockData.ts`.
2. **Fórmula de Ahorro por Proyecto**: El ahorro total de un proyecto se calcula estrictamente como:
   `Ahorro = Costo Original - Costo con Combo`
3. **Multiplicador de Moneda (Regla Crítica)**: Las columnas en USD deben calcularse multiplicando el valor en Bolivianos (Bs) por el factor de conversión oficial de la Fase 2:
   `Valor USD = Valor Bs * 6.96`
4. **Consistencia Global**: Las tarjetas de métricas del Dashboard principal deben mostrar la sumatoria total de todos los proyectos disponibles en el archivo de datos.
