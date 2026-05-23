// app/services/imageService.ts

/**
 * Subir imagen a Cloudinary utilizando la API REST
 * Retorna el public_id de la imagen subida.
 */
export async function uploadImage(file: File): Promise<string> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!uploadPreset) {
    throw new Error('Cloudinary upload preset is not defined in environment variables.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Cloudinary upload failed: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  
  // Retorna estrictamente el public_id como solicitado en los criterios de aceptación
  return data.public_id;
}
