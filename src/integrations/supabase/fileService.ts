import { supabase } from './client';

export interface UploadResponse {
  url: string;
  path: string;
  error?: string;
}

export const uploadFile = async (
  file: File,
  bucket: string = 'public',
  folder?: string
): Promise<UploadResponse> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath
    };
  } catch (error) {
    return {
      url: '',
      path: '',
      error: (error as Error).message
    };
  }
};

export const deleteFile = async (path: string, bucket: string = 'public') => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  return { error };
};