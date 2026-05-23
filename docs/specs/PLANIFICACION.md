# Planificación de Fases de Ejecución (MVP Construred)

Este documento define el ciclo de desarrollo "Spec-Driven" estricto para el MVP. Ningún agente debe desviar su enfoque de esta hoja de ruta ni intentar implementar persistencia real en bases de datos.

## FASE 1: Arquitectura Base y Contrato de Datos Inmutable
**Objetivo:** Establecer los cimientos del proyecto Next.js y centralizar el estado para garantizar consistencia matemática en todas las vistas.

*   **Paso 1.1:** Inicializar proyecto Next.js (App Router) y limpieza de estilos por defecto, garantizando el uso exclusivo de Tailwind CSS.
*   **Paso 1.2:** Crear el archivo único `mockData.ts` con el caso piloto obligatorio ("Casa Familiar - Las Palmas").
*   **Paso 1.3:** Configurar layout global (Navbar y contenedor de Dashboard).

## FASE 2: Core de Visualización Financiera
**Objetivo:** Renderizar el Dashboard y las vistas de auditoría usando los datos estáticos inmutables de la Fase 1.

*   **Paso 2.1:** Implementar Pantalla 1 (Dashboard Principal) con las tarjetas de métricas globales.
*   **Paso 2.2:** Desarrollar Pantallas 4 y 6 (Tablas de Cómputos por Fase). **Regla Crítica:** Aplicar multiplicador x 6.96 para las columnas de USD.

## FASE 3: Simuladores Interactivos
**Objetivo:** Integrar la interactividad visual para la presentación de innovación.

*   **Paso 3.1:** Crear Pantalla 2 (Formulario de Configuración de Proyecto).
*   **Paso 3.2:** Desarrollar Pantalla 3 (Carga de Planos) utilizando retardos de código (`setTimeout`) para emular el procesamiento analítico de la IA.
*   **Paso 3.3:** Implementar Pantallas 5 y 7 (Comparativa Visual de Ahorro y Gráficos).
