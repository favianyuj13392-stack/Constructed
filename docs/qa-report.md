# 📋 Reporte de Auditoría E2E & Control de Calidad Visual
**Fecha:** 23 de Mayo, 2026  
**Auditor:** Antigravity E2E QA Agent  
**Entorno:** `localhost:3000` — Next.js 16.2.6 (Turbopack)  
**Branch:** `feature/dynamic-motor`  
**Resoluciones probadas:** Desktop (1280×720) · Mobile (375×812)  
**Estado del MVP:** ⚠️ ACEPTABLE PARA DEMO / NO APTO PARA PRODUCCIÓN

---

## 1. Resumen Ejecutivo

Se realizó una auditoría completa del "Happy Path" E2E del MVP Construred en modos Desktop (1280×720) y Móvil (375×812). El flujo de creación de proyectos, simulación de carga con IA y redirección dinámica se ejecutan **sin crashes del servidor**. Sin embargo, la aplicación presenta **5 defectos críticos** que impiden calificarla como lista para producción.

**Calificación General:** `6.5 / 10`

---

## 2. Flujo E2E Ejecutado (Happy Path)

### ✅ Paso 1: Dashboard Inicial (`/`)
- **Estado:** PASÓ
- Carga rápida y limpia. Las 4 tarjetas KPI renderizan correctamente.
- Botón `+ Nuevo proyecto` visible y funcional.
- Mobile: Diseño impecable en 375px.

### ✅ Paso 2: Formulario Multi-paso (`/crear-proyecto`)
- **Estado:** PASÓ
- Datos de prueba ingresados:
  - **Nombre:** "Edificio Comercial - Zona Norte"
  - **Tipo de obra:** Comercial
  - **Ubicación:** Cochabamba, Bolivia
  - **Área:** 500 m² · **Pisos:** 5
  - **Calidad:** Premium 💎
- UI/UX: Excelente contraste en selección de calidad. Dropdowns responsivos.

### ✅ Paso 3: Simulación de IA
- **Estado:** PASÓ
- Spinner + "Analizando con IA..." visible durante ~2 segundos.
- Animación CSS fluida y sin parpadeo.

### ✅ Paso 4: Redirección Dinámica
- **Estado:** PASÓ
- Redirección automática a URL dinámica: `/proyecto/proj-1779545756479`.
- El título del Dashboard lee dinámicamente el nombre del proyecto.

---

## 3. 🚨 Defectos Críticos Encontrados

### BUG-001: Datos Hardcodeados en ExecutiveSummary.tsx (Severidad: ALTA)

**Archivo afectado:** `app/components/ExecutiveSummary.tsx` — Líneas 28-31  
**Síntoma:** A pesar de crear el proyecto "Edificio Comercial - Zona Norte" (500m², 5 pisos), el subcard de resumen muestra estáticamente:
- Nombre: `Casa Familiar – Las Palmas`
- Ubicación: `Santa Cruz, Bolivia`
- Área: `191 m²`
- Pisos: `2 pisos`

**Causa raíz:** El componente `ExecutiveSummary` tiene texto hardcodeado en JSX (líneas 28-31) en lugar de consumir las propiedades del proyecto dinámico.

**Fix sugerido (Tailwind Classes: N/A — es lógica, no CSS):**
```diff
- <h3 className="text-sm font-bold text-[#1B5E3B]">Casa Familiar – Las Palmas</h3>
- <p className="text-xs text-gray-500 ...">📍 Santa Cruz, Bolivia</p>
- <span>📐 191 m²</span><span>🏢 2 pisos</span>
+ <h3 className="text-sm font-bold text-[#1B5E3B]">{proyecto.nombre}</h3>
+ <p className="text-xs text-gray-500 ...">📍 {proyecto.ubicacion}</p>
+ <span>📐 {proyecto.areaM2} m²</span><span>🏢 {proyecto.pisos} pisos</span>
```
> Requiere pasar `proyecto: IProyecto` como prop al componente.

---

### BUG-002: Motor de Cálculo No Inyecta Valores Reales (Severidad: ALTA)

**Archivo afectado:** `app/proyecto/[id]/page.tsx` — Línea ~119  
**Síntoma:** Las tablas de "Fases Constructivas" muestran cantidades y totales correspondientes a 191m² (el proyecto piloto) incluso cuando se creó con 500m². Ejemplo: `Nivelación de Terreno → Cant: 95.38` debería ser `249.7` para 500m².

**Causa raíz:** El `getProjectById()` devuelve un objeto `IProyecto` con `areaM2` y `pisos` correctos, pero los valores pasan a `usePresupuestoCalculator(proyecto?.areaM2 || 0, proyecto?.pisos || 1)`. Si el proyecto NO se encuentra (porque la memoria SPA se reseteó), los fallbacks `0` y `1` se activan y producen un presupuesto vacío. Si `getProjectById` retorna el proyecto piloto por fallback, se obtiene `191m²` siempre.

**Fix sugerido:** Asegurar que `getProjectById` devuelva el proyecto dinámico real creado por `createProject()`, no el piloto hardcodeado.

---

### BUG-003: Persistencia Efímera — Sin Supervivencia a Recarga (Severidad: ALTA)

**Archivo afectado:** `app/services/construredApi.ts`  
**Síntoma:** Si el usuario refresca la página (`F5`) después de crear un proyecto, la ruta `/proyecto/proj-xxxxx` se queda en estado de carga infinito ("Cargando...") porque el proyecto desaparece de la memoria.

**Causa raíz:** El fallback de Supabase guarda el proyecto en `PROJECTS_LIST.unshift(newProject)` — un array en memoria del módulo JS que se resetea en cada recarga de página (full page reload).

**Fix sugerido:**
```typescript
// Usar localStorage como capa de persistencia secundaria
const LOCAL_KEY = 'construred_projects';

function getLocalProjects(): IProyecto[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(LOCAL_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveLocalProject(p: IProyecto) {
  const existing = getLocalProjects();
  existing.unshift(p);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
}
```

---

### BUG-004: Tarjetas de Proyecto No Enlazadas (Severidad: MEDIA)

**Archivo afectado:** `app/components/ProjectList.tsx` — Líneas 135-143  
**Síntoma:** En el Dashboard principal, solo la tarjeta del proyecto piloto (`proj-001`) es cliqueable (tiene `<Link>`). Los proyectos dinámicos creados por el usuario se renderizan dentro de un `<div>` sin enlace.

**Causa raíz:** Lógica condicional en línea 135:
```tsx
if (isPilot) {
  return <Link href="/proyecto/las-palmas">...</Link>;  // ← Solo el piloto
}
return <div>{CardContent}</div>;  // ← Todos los demás: NO CLICKEABLES
```

**Fix sugerido (clase Tailwind: N/A — es lógica):**
```diff
- if (isPilot) {
-   return <Link href="/proyecto/las-palmas" className="block">{CardContent}</Link>;
- }
- return <div>{CardContent}</div>;
+ return (
+   <Link href={`/proyecto/${proyecto.id}`} className="block">
+     {CardContent}
+   </Link>
+ );
```

---

### BUG-005: Hydration Mismatch en Consola (Severidad: BAJA)

**Síntoma:** Error en consola del navegador al cargar cualquier página:
```
A tree hydrated but some attributes of the server rendered HTML 
didn't match the client properties. This won't be patched up.
```

**Causa raíz:** Inyección de clases dinámicas al `<body>` (`antigravity-scroll-lock`) que difieren entre SSR y CSR. Posiblemente generado por extensiones del navegador o el scroll lock del layout.

**Impacto:** Cosmético. No bloquea funcionalidad pero puede causar "flashes" visuales intermitentes.

---

## 4. Auditoría Visual por Resolución

### Desktop (1280×720)

| Componente | Estado | Observación |
|---|---|---|
| Header (Logo + Avatar) | ✅ OK | Alineación correcta |
| KPI Cards (4 tarjetas) | ✅ OK | Grid 2×2, sin overflow |
| Barra de búsqueda | ✅ OK | Responsiva y funcional |
| Lista de proyectos | ✅ OK | Hover states visibles |
| Bottom Nav | ⚠️ | Botón flotante `+` funcional pero puede superponerse con CTAs en formularios |
| Tabla de materiales | ✅ OK | Scroll horizontal correcto |
| Gráfico de barras | ⚠️ | Barras proporcionales estáticas (CSS heights fijos en `64px`/`60px`), no escalan con los datos |

**Sugerencias de Clases Tailwind (Desktop):**

| Problema | Clase sugerida | Archivo |
|---|---|---|
| KPI cards en desktop deberían ser 4 columnas | `md:grid-cols-4` | `page.tsx` (Dashboard) |
| Tabla comparativa en Resumen muy ancha en desktop | `max-w-3xl mx-auto` | `ExecutiveSummary.tsx` |
| Botón CTA del formulario superpuesto con BottomNav | `mb-20` al main container | `crear-proyecto/page.tsx` |

### Mobile (375×812)

| Componente | Estado | Observación |
|---|---|---|
| Header | ✅ OK | Logo y avatar perfectos |
| KPI Cards | ✅ OK | Grid 2×2 responsivo |
| Formulario de creación | ✅ OK | Inputs y dropdowns adaptados |
| Tabla de materiales | ✅ OK | Scroll horizontal funcional |
| Bottom Nav + FAB | ✅ OK | Espaciado cómodo al tacto |
| Selector de calidad | ✅ OK | Botones 3-col visibles |

**Calificación Mobile:** `9/10` — Diseño Mobile-First excelente.

---

## 5. Matriz de Priorización de Fixes

| ID | Defecto | Severidad | Esfuerzo | Prioridad |
|---|---|---|---|---|
| BUG-001 | ExecutiveSummary hardcodeado | 🔴 Alta | 15 min | P0 |
| BUG-002 | Motor no inyecta areaM2 real | 🔴 Alta | 30 min | P0 |
| BUG-003 | Sin persistencia a recarga | 🔴 Alta | 45 min | P0 |
| BUG-004 | Tarjetas no clickeables | 🟡 Media | 10 min | P1 |
| BUG-005 | Hydration mismatch | 🟢 Baja | 15 min | P2 |

---

## 6. Conclusión

El MVP es **excelente para una demo interactiva** y demuestra un flujo visual atractivo y fluido. La implementación Mobile-First es sobresaliente. Sin embargo, los 3 bugs P0 (datos hardcodeados, motor estático y persistencia efímera) impiden que el ciclo completo "Crear → Calcular → Consultar" funcione de extremo a extremo con datos reales del usuario.

**Recomendación:** Resolver los 5 bugs antes del deploy a producción en Vercel. Estimación total: **~2 horas de desarrollo**.
