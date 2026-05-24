import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postAdminUploadsPresignMutation } from '@/lib/api/generated/@tanstack/react-query.gen';

export function useCampaignImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Instantiating the hey-api generated presign mutation
  const presignMutation = useMutation(postAdminUploadsPresignMutation());

  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // 1. Validate file constraints
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('Ukuran file maksimal adalah 2MB');
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        throw new Error('Format file harus PNG, JPG, atau JPEG');
      }

      // 2. Request presigned URL from backend
      const presignResult = await presignMutation.mutateAsync({
        body: {
          purpose: 'campaign',
          kind: 'cover',
          mimeType: file.type,
          sizeBytes: file.size,
          originalFileName: file.name,
        },
      });

      if (!presignResult || !presignResult.upload) {
        throw new Error('Gagal mendapatkan URL upload dari server');
      }

      const { assetId, upload } = presignResult;

      // 3. Upload file directly to R2 using the presigned URL
      // We must pass the headers returned by the presign endpoint
      const response = await fetch(upload.url, {
        method: 'PUT',
        body: file,
        headers: upload.headers,
      });

      if (!response.ok) {
        throw new Error('Gagal mengunggah file ke penyimpanan cloud R2');
      }

      return assetId;
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Terjadi kesalahan saat mengunggah gambar';
      setUploadError(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error: uploadError,
  };
}
export default useCampaignImageUpload;
