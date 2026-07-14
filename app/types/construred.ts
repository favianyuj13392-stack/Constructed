// src/types/construred.ts
// Contrato de tipos del dominio Construred MVP
// Los campos USD son derivados en la capa de presentación (T/C: Bs * 6.96)

export interface ISubMaterial {
  nombre: string;
  cantidadUnitaria: number;
  unidad: string;
}

export interface IMaterial {
  id: string;
  descripcion: string;
  unidad: string;
  precioUnitarioBs: number;
  cantidad: number;
  precioComboBs?: number; // Opcional: Solo si el ítem tiene descuento por combo
  subMateriales?: ISubMaterial[]; // Desglose de materiales usados (ej. Cemento, Arena)
}

export interface IFase {
  id: string;
  nombre: string;
  descripcion: string;
  materiales: IMaterial[];
}

export interface IProyecto {
  id: string;
  nombre: string;
  ubicacion: string;
  areaM2: number;
  pisos: number;
  estado: 'Borrador' | 'En carga' | 'En análisis' | 'Presupuesto generado';
  imagen_id?: string;
  fases?: IFase[];
  // Datos de estructura
  tipoEstructura?: string;
  cargaViva?: number;
  cargaAdicional?: number;
  cargaMuerta?: number;
  cargaPesoPropio?: number;
  espesorLosa?: number;
  ejeViguetas?: number;
  apoyoViguetas?: number;
  longitudComplementos?: number;
  cargaTotal?: number;
  relacionLe?: number;
  productosCombo?: string[];
}

export interface IGlobalMetrics {
  proyectosTotales: number;
  presupuestosGenerados: number;
  ahorroTotalEstimadoBs: number;
  cashbackProyectadoBs: number;
}
