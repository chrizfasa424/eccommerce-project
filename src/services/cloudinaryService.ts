interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes?: number;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  completed: boolean;
  error?: string;
}

class CloudinaryService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  private getApiBaseUrl(): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    // Remove trailing slash if present
    return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  async uploadImage(file: File, folder: string = 'products'): Promise<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const response = await fetch(`${this.getApiBaseUrl()}/api/upload/image`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload image');
    }

    const data = await response.json();
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      resource_type: 'image',
      bytes: data.bytes
    };
  }

  async uploadVideo(file: File, folder: string = 'products'): Promise<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append('video', file);
    formData.append('folder', folder);

    const response = await fetch(`${this.getApiBaseUrl()}/api/upload/video`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload video');
    }

    const data = await response.json();
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      resource_type: 'video',
      bytes: data.bytes
    };
  }

  async uploadMedia(file: File, folder: string = 'products'): Promise<CloudinaryUploadResponse> {
    if (file.type.startsWith('image/')) {
      return this.uploadImage(file, folder);
    } else if (file.type.startsWith('video/')) {
      return this.uploadVideo(file, folder);
    } else {
      throw new Error('Unsupported file type. Only images and videos are allowed.');
    }
  }

  async uploadMultipleFiles(
    files: File[],
    folder: string = 'products',
    onProgress?: (uploads: UploadProgress[]) => void
  ): Promise<CloudinaryUploadResponse[]> {
    const results: CloudinaryUploadResponse[] = [];
    const uploadProgresses: UploadProgress[] = files.map(file => ({
      fileName: file.name,
      progress: 0,
      completed: false
    }));

    onProgress?.(uploadProgresses);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        uploadProgresses[i].progress = 50; // Start upload
        onProgress?.(uploadProgresses);

        const result = await this.uploadMedia(file, folder);
        results.push(result);

        uploadProgresses[i].progress = 100;
        uploadProgresses[i].completed = true;
        onProgress?.(uploadProgresses);
      } catch (error: any) {
        uploadProgresses[i].error = error.message;
        uploadProgresses[i].completed = true;
        onProgress?.(uploadProgresses);
        throw error;
      }
    }

    return results;
  }

  generatePreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  revokePreviewUrl(url: string): void {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  }

  validateFile(file: File, maxSize: number, allowedTypes: string[]): string | null {
    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
    }

    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  }

  async deleteMedia(publicId: string): Promise<void> {
    try {
      const response = await fetch(`${this.getApiBaseUrl()}/api/upload/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete media');
      }
    } catch (error: any) {
      console.warn('Failed to delete media from Cloudinary:', error.message);
      // Don't throw error as deletion failure shouldn't block UI
    }
  }
}

export const cloudinaryService = new CloudinaryService();
export type { CloudinaryUploadResponse, UploadProgress };
