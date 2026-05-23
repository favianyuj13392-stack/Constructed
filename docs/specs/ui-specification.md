# Especificación de UI/UX - Replicación de Mockup (MVP Construred)

## Objetivo
Refactorizar los componentes de código local en la estructura de Next.js para que coincidan con una fidelidad del 100% (Pixel-Perfect) con los mockups visuales adjuntos.

## Entradas Visuales
- Mockup Pantalla 1: `../mockups/pantalla 1.jpeg`
- Mockup Pantalla 2: `../mockups/pantalla 2.jpeg`
- Mockup Pantalla 3: `../mockups/pantalla 3.jpeg`
- Mockup Pantalla 4: `../mockups/pantalla 4.jpeg`
- Mockup Pantalla 5: `../mockups/pantalla 5.jpeg`
- Mockup Pantalla 6: `../mockups/pantalla 6.jpeg`
- Mockup Pantalla 7: `../mockups/pantalla 7.jpeg`

## Reglas de Desarrollo (Spec-Driven)
1. Analizar todas las imágenes de la carpeta mockups usando la habilidad visual de Stitch de forma secuencial.
2. Utilizar la skill local `tailwind-ui-renderer` para estructurar los estilos de manera limpia y estandarizada.
3. Extraer y aplicar la paleta de colores (códigos hexadecimales) y tipografías directamente de los mockups provistos para Construred. Queda estrictamente prohibido utilizar paletas corporativas ajenas.
4. Respetar estrictamente los espaciados (padding, margin), alineaciones, sombras y bordes redondeados del diseño original.
5. Modificar únicamente los archivos frontend locales pertinentes dentro de la carpeta `src/app/` (Next.js).