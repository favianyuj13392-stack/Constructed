---

name: tailwind-ui-renderer

description: Analiza mockups visuales y genera maquetas web limpias utilizando Tailwind CSS, adaptando la interfaz con precisión quirúrgica al diseño objetivo.

---



# Skill: Tailwind UI Renderer (Fidelidad Visual)



## Objetivo General

Guiar al agente para interpretar imágenes de maquetas y estructurar interfaces frontend nativas con utilidades de Tailwind CSS, garantizando coincidencia tipográfica, de color y espacial.



## Instrucciones de Ejecución



1. **Prioridad Visual Absoluta**: No asumas paletas de colores ni sistemas de diseño preestablecidos. Extrae las muestras de color (hexadecimales) directamente de las imágenes provistas en la especificación mediante la skill de Stitch.

2. Estructura Responsiva Mobile-First Obligatoria: El proyecto es estrictamente Mobile-First. Construye la interfaz optimizada para visualización móvil utilizando utilidades nativas de Tailwind. Utiliza obligatoriamente un contenedor máximo (`max-w-md` o `max-w-lg`) centrado en pantalla si se visualiza en desktop, replicando la experiencia de los mockups sin excepciones.
   
3. Fidelidad de Componentes:
   * Botones y Acciones: Duplica de forma idéntica los radios de curvatura (`rounded-*`), grosores de borde y estados visuales observados.
   * Espaciados: Mide visualmente las proporciones de padding (`p-*`) y margin (`m-*`) para evitar interfaces saturadas o excesivamente dispersas.
   * Distribución: Utiliza Flexbox (`flex`) y CSS Grid (`grid`) nativos de Tailwind para replicar la alineación exacta de las tarjetas de datos, barras laterales o formularios.
   * 
4. **Acoplamiento con Next.js**: Estructura el marcado asegurando compatibilidad con la carpeta `app/` de Next.js (utilizando selectores limpios y aislando estados si se requieren componentes de cliente).