import type { ISubMaterial } from '../types/construred';

export interface IItemCatalogo {
  id: string;
  fase: 'PRIMERA FASE' | 'SEGUNDA FASE' | 'TERCERA FASE' | 'CUARTA FASE';
  descripcion: string;
  unidad: string;
  precioMercadoBs: number;
  precioComboBs?: number;
  rendimientoM2: number;
  subMateriales?: ISubMaterial[];
}

export const CATALOGO_MATERIALES: IItemCatalogo[] = [
  // ── PRIMERA FASE: Obras Preliminares ──────────────────────────────────────
  {
    id: 'mat-01-01',
    fase: 'PRIMERA FASE',
    descripcion: 'INSTALACIÓN DE FAENAS',
    unidad: 'glb',
    precioMercadoBs: 2517.41,
    rendimientoM2: 0.0052,
  },
  {
    id: 'mat-01-02',
    fase: 'PRIMERA FASE',
    descripcion: 'NIVELACIÓN DE TERRENO (no clasificado)',
    unidad: 'm²',
    precioMercadoBs: 4.82,
    precioComboBs: 1.58,
    rendimientoM2: 0.4994,
  },
  {
    id: 'mat-01-03',
    fase: 'PRIMERA FASE',
    descripcion: 'TRAZADO Y REPLANTEO',
    unidad: 'm²',
    precioMercadoBs: 1.29,
    rendimientoM2: 0.4994,
  },

  // ── SEGUNDA FASE: Estructura Portante ─────────────────────────────────────
  {
    id: 'mat-02-01',
    fase: 'SEGUNDA FASE',
    descripcion: 'HORMIGÓN ARMADO PARA ZAPATAS',
    unidad: 'm³',
    precioMercadoBs: 1500.0,
    precioComboBs: 1285.60,
    rendimientoM2: 0.0130,
    subMateriales: [
      { nombre: 'Cemento Portland (SOBOCE)', cantidadUnitaria: 350, unidad: 'kg' },
      { nombre: 'Arena lavada', cantidadUnitaria: 0.45, unidad: 'm³' },
      { nombre: 'Grava triturada', cantidadUnitaria: 0.85, unidad: 'm³' },
      { nombre: 'Acero corrugado', cantidadUnitaria: 45, unidad: 'kg' },
      { nombre: 'Agua', cantidadUnitaria: 180, unidad: 'lt' }
    ]
  },
  {
    id: 'mat-02-02',
    fase: 'SEGUNDA FASE',
    descripcion: 'COLUMNAS DE HORMIGÓN ARMADO',
    unidad: 'm³',
    precioMercadoBs: 1600.0,
    rendimientoM2: 0.0052,
    subMateriales: [
      { nombre: 'Cemento Portland (SOBOCE)', cantidadUnitaria: 350, unidad: 'kg' },
      { nombre: 'Arena lavada', cantidadUnitaria: 0.45, unidad: 'm³' },
      { nombre: 'Grava triturada', cantidadUnitaria: 0.85, unidad: 'm³' },
      { nombre: 'Acero corrugado', cantidadUnitaria: 90, unidad: 'kg' },
      { nombre: 'Alambre de amarre', cantidadUnitaria: 1.5, unidad: 'kg' },
      { nombre: 'Madera de encofrado', cantidadUnitaria: 12, unidad: 'p2' }
    ]
  },
  {
    id: 'mat-02-03',
    fase: 'SEGUNDA FASE',
    descripcion: 'VIGAS DE CONEXIÓN Y RIOSTRAS',
    unidad: 'm³',
    precioMercadoBs: 1450.0,
    rendimientoM2: 0.0002,
  },

  // ── TERCERA FASE: Obra Gruesa ──────────────────────────────────────────────
  {
    id: 'mat-03-01',
    fase: 'TERCERA FASE',
    descripcion: 'MURO DE LADRILLO DE 6 HUECOS',
    unidad: 'm²',
    precioMercadoBs: 52.0,
    precioComboBs: 51.98,
    rendimientoM2: 6.2827,
    subMateriales: [
      { nombre: 'Ladrillo 6 huecos', cantidadUnitaria: 25, unidad: 'pza' },
      { nombre: 'Cemento Portland', cantidadUnitaria: 5.5, unidad: 'kg' },
      { nombre: 'Arena fina', cantidadUnitaria: 0.02, unidad: 'm³' }
    ]
  },
  {
    id: 'mat-03-02',
    fase: 'TERCERA FASE',
    descripcion: 'REVOQUE EXTERIOR GRUESO',
    unidad: 'm²',
    precioMercadoBs: 35.0,
    rendimientoM2: 5.3351,
  },
  {
    id: 'mat-03-03',
    fase: 'TERCERA FASE',
    descripcion: 'VIGAS DE CORONACIÓN',
    unidad: 'm³',
    precioMercadoBs: 240.0,
    rendimientoM2: 0.1571,
  },

  // ── CUARTA FASE: Obra Fina y Terminaciones ────────────────────────────────
  {
    id: 'mat-04-01',
    fase: 'CUARTA FASE',
    descripcion: 'PISO PORCELANATO 60x60',
    unidad: 'm²',
    precioMercadoBs: 120.0,
    rendimientoM2: 1.0000,
  },
  {
    id: 'mat-04-02',
    fase: 'CUARTA FASE',
    descripcion: 'CIELO FALSO DE YESO',
    unidad: 'm²',
    precioMercadoBs: 45.0,
    rendimientoM2: 1.0000,
  },
  {
    id: 'mat-04-03',
    fase: 'CUARTA FASE',
    descripcion: 'PINTURA LÁTEX INTERIOR',
    unidad: 'm²',
    precioMercadoBs: 22.0,
    rendimientoM2: 4.1885,
  },
];
