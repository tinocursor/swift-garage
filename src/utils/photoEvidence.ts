export interface PhotoEvidence {
  id: string;
  url: string;
  filename: string;
  timestamp: Date;
  description?: string;
}

export const capturePhotoEvidence = async (
  file: File,
  description?: string
): Promise<PhotoEvidence> => {
  // Mock implementation - replace with actual file upload
  const id = crypto.randomUUID();
  const url = URL.createObjectURL(file);
  
  return {
    id,
    url,
    filename: file.name,
    timestamp: new Date(),
    description
  };
};

export const validatePhoto = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};