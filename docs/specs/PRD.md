# DOCUMENTO DE REQUERIMIENTOS TÉCNICOS Y FUNCIONALES

## Proyecto: Plataforma Construred - Planificación Inteligente y Simulación Financiera de Obras (MVP)
**Cliente:** Ing. Salazar (Programa de Innovación)
**Preparado por:** Tech Lead - DARKOSYNC.AI
**Fecha de Entrega Estimada del MVP:** Viernes de esta semana
**Presupuesto Acordado:** 2,000 BOB (Bolivianos)

## 1. Introducción y Propuesta de Valor

**CONSTRURED ("Construimos el futuro")** es una plataforma tecnológica de toma de decisiones y planificación diseñada para ayudar a constructores medianos y pequeños a estimar, planificar, auditar y optimizar los costos de sus obras desde el inicio, evitando sobrecostos inesperados y retrasos.

### El Problema de Negocio (Mapeado de Diapositivas):
1.  **Procesos manuales:** Alta dependencia de cálculos manuales y planillas de Excel lentas y propensas a errores.
2.  **Falta de planificación por fases:** Dificultad extrema para visualizar los costos financieros por etapas de la obra.
3.  **Información desactualizada:** Estimaciones poco realistas basadas en precios y referencias de mercado obsoletos.
4.  **Dependencia de terceros:** Falta de autonomía inicial para la toma de decisiones presupuestarias rápidas.
5.  **Compras ineficientes de materiales:** Adquisición de materiales desorganizada, sin optimizar cantidades ni comparar alternativas de compra masiva.

### La Solución de Construred:
* **Generación de Presupuestos Automáticos y Rápidos:** Herramienta ágil de estimación inicial mediante variables de obra básicas.
* **Simulador Comparativo (Mercado vs. Combos Optimizados):** Visualización analítica de cómo la adquisición de paquetes agrupados inteligentes ("combos" sugeridos de cantidades optimizadas) reduce los costos frente a la compra individual tradicional.
* **Proyección de Beneficios Financieros:** Simulación del Cashback acumulado y descuentos negociados con la red de proveedores para respaldar la viabilidad financiera del proyecto.

## 2. Arquitectura de Software y Escalabilidad

Para el MVP de este viernes, se empleará una arquitectura ligera de costo cero de operación que sirva como cimiento para la escala industrial:

* **Frontend:** React / Next.js alojado de forma gratuita en **Vercel**. Interfaz interactiva y responsiva con enfoque **Mobile-First**, diseñada para que el constructor tome decisiones directamente desde la obra.
* **Backend:** **Supabase** (PostgreSQL) usando Edge Functions serverless en TypeScript para procesar los motores de cálculo, simulación y generación del presupuesto financiero de forma ágil y con coste nulo de servidor.
* **Escalabilidad de IA (Planificación Futura):** El cargador de planos del sistema está pensado para conectarse mediante las Edge Functions de Supabase a modelos multimodales de Computer Vision. La IA auditará los archivos subidos, extraerá las dimensiones reales y las cruzará automáticamente con el motor de presupuestos de Construred para validar que lo planificado coincida con la realidad física de la obra.

## 3. Especificación del Flujo de Pantallas del MVP

El MVP guiará al constructor a través de un flujo intuitivo de planificación financiera:

### Pantalla 1: Home / Dashboard Principal ("¡Hola, Constructor!")
* **Propósito:** Ofrecer un panel de control rápido para la toma de decisiones de todos los proyectos del constructor.
* **Tarjetas de Control Global:**
    1.  Proyectos totales: 8 (en gestión o planificación)
    2.  Presupuestos generados: 5 (proyectos con simulación financiera completada)
    3.  Ahorro total estimado: Bs 34.500 (acumulado proyectado al usar planificación inteligente)
    4.  Cashback proyectado acumulado: Bs 8.500 (retorno financiero latente por optimización en combos de compra)
* **Buscador y Lista de "Mis proyectos" (Clasificados por Estado de Planificación):**
    * *Casa Familiar - Las Palmas* (Santa Cruz | 191 m² | 2 pisos). Estado: **Presupuesto generado** (Bs 353.000 estimado | Bs 34.500 ahorro proyectado).
    * *Ampliación - Oficina Central* (Cochabamba | 120 m² | 1 piso). Estado: **En análisis**.
    * *Local Comercial - Equipetrol* (Santa Cruz | 95 m² | 1 piso). Estado: **En carga**.
    * *Casa de Campo - Warnes* (Warnes | 220 m² | 1 piso). Estado: **Borrador**.

### Pantalla 2: Crear Proyecto (Configuración de Variables de Estimación)
* **Propósito:** Mapear los datos básicos de la obra que alimentarán el motor de fórmulas matemáticas.
* **Campos interactivos:** Nombre del proyecto, Tipo de obra (Vivienda), Tipo de proyecto (Obra nueva), Ubicación (Santa Cruz, Bolivia), Área construida (m²), Número de pisos (2) y fechas de inicio.
* **Nivel de Calidad/Acabados (Económica, Estándar, Premium):** Define qué constantes de rendimiento y calidades de insumos aplicará el simulador.

### Pantalla 3: Simulación de Carga de Planos y Documentos
* **Propósito:** Espacio interactivo que demuestra visualmente cómo el constructor subirá sus insumos (Planos arquitectónicos en PDF/JPG) para que a futuro la Inteligencia Artificial los audite.
* **Flujo del MVP:** Al pulsar "Procesar", el sistema emula con un retardo visual la lectura y el cálculo matemático instantáneo.

### Pantalla 4: Desglose y Auditoría de Cómputos por Fase (Detalle de la Primera Fase)
* **Propósito:** Permitir al constructor visualizar y analizar las cantidades de materiales estimadas por el sistema.
* **Selector de Fase Interactivo:** Obras preliminares, Estructura, Obra gruesa, Obra fina.
* **Visualización de Tabla (Caso Piloto: Primera Fase - Bs 49.389):** *(T/C = 6.96)*

| Descripción | UN. | P.U. (Bs) | P.U. (USD) | CANT. | TOTAL (Bs) | TOTAL (USD) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **INSTALACIÓN DE FAENAS** | glb | 2.517,41 | 361,70 | 1,00 | 2.517,41 | 361,70 |
| **NIVELACIÓN DE TERRENO (no clasificado)** | m² | 4,82 | 0,69 | 95,40 | 459,83 | 66,07 |
| **TRAZADO Y REPLANTEO** | m² | 1,29 | 0,19 | 95,40 | 123,06 | 17,68 |

### Pantalla 5: Comparativa de Alternativas y Simulación de Ahorro
* **Propósito:** Apoyar la toma de decisiones mostrando la diferencia económica entre la adquisición tradicional y la optimizada en "Combos Construred".
* **Métricas en Gráfico de Barras Comparativo:**
    * **Costo de Mercado Tradicional:** Bs 398.539.
    * **Costo con Combos Construred:** Bs 397.671.
    * **Ahorro total simulado:** **Bs 868** (0.22% menos en el costo financiero del proyecto).
* **Tabla de Planificación Comparativa por Fases:**

| Fase | Mercado Tradicional (BOB) | Combos Construred (BOB) | Ahorro Simulado (BOB) |
| :---: | :---: | :---: | :---: |
| **PRIMERA FASE** | 49.389 | 49.080 | 309 |
| **SEGUNDA FASE** | 37.646 | 37.110 | 536 |
| **TERCERA FASE** | 663.851 | 663.827 | 24 |
| **CUARTA FASE** | 1.728.585 | 1.728.585 | 0 |
| **TOTAL AHORRO** | | | **Bs 868** |

### Pantalla 6: Detalle de Materiales por Fase (Fases II, III y IV)
* **Propósito:** Presentar el desglose de ítems constructivos correspondientes a las fases posteriores del proyecto piloto. *(T/C = 6.96)*

#### Segunda Fase: Estructura Portante (Presupuesto estimado: Bs 37.646,64 / USD 5.409,00)
| Descripción | UN. | P.U. (Bs) | P.U. (USD) | CANT. | TOTAL (Bs) | TOTAL (USD) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **HORMIGÓN ARMADO PARA ZAPATAS** | m³ | 1.500,00 | 215,51 | 2,50 | 3.750,00 | 538,79 |
| **COLUMNAS DE HORMIGÓN ARMADO** | m³ | 1.600,00 | 229,88 | 1,00 | 1.600,00 | 229,88 |
| **VIGAS DE CONEXIÓN Y RIOSTRAS** | m³ | 1.450,00 | 208,33 | 0,04 | 58,00 | 8,33 |

#### Tercera Fase: Obra Gruesa (Presupuesto estimado: Bs 663.851,76 / USD 95.381,00)
| Descripción | UN. | P.U. (Bs) | P.U. (USD) | CANT. | TOTAL (Bs) | TOTAL (USD) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **MURO DE LADRILLO DE 6 HUECOS** | m² | 52,00 | 7,47 | 1.200,00 | 62.400,00 | 8.965,51 |
| **REVOQUE EXTERIOR GRUESO** | m² | 35,00 | 5,02 | 1.019,00 | 35.665,00 | 5.124,28 |
| **VIGAS DE CORONACIÓN** | m³ | 240,00 | 34,48 | 30,00 | 7.200,00 | 1.034,48 |

#### Cuarta Fase: Obra Fina y Terminaciones (Presupuesto estimado: Bs 1.728.585,60 / USD 248.360,00)
| Descripción | UN. | P.U. (Bs) | P.U. (USD) | CANT. | TOTAL (Bs) | TOTAL (USD) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **PISO PORCELANATO 60x60** | m² | 120,00 | 17,24 | 191,00 | 22.920,00 | 3.293,10 |
| **CIELO FALSO DE YESO** | m² | 45,00 | 6,46 | 191,00 | 8.595,00 | 1.234,91 |
| **PINTURA LÁTEX INTERIOR** | m² | 22,00 | 3,16 | 800,00 | 17.600,00 | 2.528,73 |

### Pantalla 7: Comparativa de Ahorros por Ítems de Combos
* **Propósito:** Demostrar analíticamente al constructor en qué materiales específicos y por qué decisiones de optimización se genera el ahorro total de **Bs 868**.

#### Comparativa Primera Fase: Obras Preliminares (Ahorro total: Bs 309)
* **Nivelación de terreno (no clasificado):**
    * *Precio Mercado:* Bs 460 (P.U.: Bs 4,82)
    * *Precio Combo Construred:* Bs 151 (P.U. Optimizado: Bs 1,58)
    * *Ahorro en este ítem:* **Bs 309**

#### Comparativa Segunda Fase: Estructura Portante (Ahorro total: Bs 536)
* **Hormigón Armado para Zapatas (Fierro/Cemento):**
    * *Precio Mercado:* Bs 3.750 (P.U.: Bs 1.500)
    * *Precio Combo Construred:* Bs 3.214 (P.U. Optimizado: Bs 1.285,60)
    * *Ahorro en este ítem:* **Bs 536**

#### Comparativa Tercera Fase: Obra Gruesa (Ahorro total: Bs 24)
* **Muro de ladrillo de 6 huecos:**
    * *Precio Mercado:* Bs 62.400 (P.U.: Bs 52,00)
    * *Precio Combo Construred:* Bs 62.376 (P.U. Optimizado: Bs 51,98)
    * *Ahorro en este ítem:* **Bs 24**

#### Comparativa Cuarta Fase: Obra Fina y Terminaciones (Ahorro total: Bs 0)
* En el proyecto piloto, esta fase no cuenta con combos activos de descuento para demostrar el escenario donde el constructor decide planificar con acabados altamente personalizados.
    * *Ahorro en este ítem:* **Bs 0**

## 4. Plan de Acción Inmediato para el MVP

El MVP debe demostrar que Construred no es una simple tienda en línea de materiales, sino un potente software de análisis, auditoría y control de costos para la toma de decisiones inteligentes en la construcción.