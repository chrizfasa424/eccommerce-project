// src/services/variantMediaService.ts
import { VariantMedia, VariantMediaStats, VariantMediaUploadResponse } from '../types/variant';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class VariantMediaService {
  private static getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  private static getAuthHeadersWithJSON(): HeadersInit {
    return {
      ...this.getAuthHeaders(),
      'Content-Type': 'application/json',
    };
  }

  /**
   * Upload media files for a variant
   */
  static async uploadVariantMedia(
    variantId: number,
    files: FileList,
    options: {
      type?: 'IMAGE' | 'VIDEO';
      isPrimary?: boolean;
    } = {}
  ): Promise<VariantMediaUploadResponse> {
    const formData = new FormData();
    
    // Add files
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });
    
    // Add options
    if (options.type) {
      formData.append('type', options.type);
    }
    if (options.isPrimary !== undefined) {
      formData.append('is_primary', options.isPrimary.toString());
    }

    const response = await fetch(
      `${API_BASE_URL}/api/shop/variants/${variantId}/media`,
      {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload media');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Get all media for a variant
   */
  static async getVariantMedia(variantId: number): Promise<{
    variant_media: VariantMedia[];
    parent_media: VariantMedia[];
    has_variant_media: boolean;
    total_media: number;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/api/shop/variants/${variantId}/media`,
      {
        method: 'GET',
        headers: this.getAuthHeadersWithJSON(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get variant media');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Update media sort order
   */
  static async updateMediaOrder(
    variantId: number,
    mediaOrders: Array<{ media_id: number; sort_order: number }>
  ): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/api/shop/variants/${variantId}/media/order`,
      {
        method: 'PUT',
        headers: this.getAuthHeadersWithJSON(),
        body: JSON.stringify({ media_orders: mediaOrders }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update media order');
    }
  }

  /**
   * Set primary media for variant
   */
  static async setPrimaryMedia(variantId: number, mediaId: number): Promise<VariantMedia> {
    const response = await fetch(
      `${API_BASE_URL}/api/shop/variants/${variantId}/media/${mediaId}/primary`,
      {
        method: 'PUT',
        headers: this.getAuthHeadersWithJSON(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to set primary media');
    }

    const result = await response.json();
    return result.data.media;
  }

  /**
   * Delete variant media
   */
  static async deleteVariantMedia(variantId: number, mediaId: number): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/api/shop/variants/${variantId}/media/${mediaId}`,
      {
        method: 'DELETE',
        headers: this.getAuthHeadersWithJSON(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete media');
    }
  }

  /**
   * Get media statistics for variant
   */
  static async getMediaStats(variantId: number): Promise<VariantMediaStats> {
    const response = await fetch(
      `${API_BASE_URL}/api/shop/variants/${variantId}/media/stats`,
      {
        method: 'GET',
        headers: this.getAuthHeadersWithJSON(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get media stats');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Copy parent media to variant
   */
  static async copyParentMedia(variantId: number): Promise<VariantMediaUploadResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/shop/variants/${variantId}/media/copy-parent`,
      {
        method: 'POST',
        headers: this.getAuthHeadersWithJSON(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to copy parent media');
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Helper method to validate file types
   */
  static validateFiles(files: FileList, mediaType: 'IMAGE' | 'VIDEO' = 'IMAGE'): string[] {
    const errors: string[] = [];
    const maxFileSize = 10 * 1024 * 1024; // 10MB per file
    
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/mov'];
    
    const allowedTypes = mediaType === 'IMAGE' ? allowedImageTypes : allowedVideoTypes;

    Array.from(files).forEach((file, index) => {
      // Check file size
      if (file.size > maxFileSize) {
        errors.push(`File ${index + 1}: Size exceeds 10MB limit`);
      }

      // Check file type
      if (!allowedTypes.includes(file.type)) {
        errors.push(`File ${index + 1}: Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
      }
    });

    return errors;
  }

  /**
   * Helper method to get media URL with transformations
   */
  static getOptimizedMediaUrl(
    media: VariantMedia,
    options: {
      width?: number;
      height?: number;
      quality?: 'auto' | number;
      format?: 'auto' | 'webp' | 'jpg' | 'png';
    } = {}
  ): string {
    if (!media.public_id) {
      return media.url;
    }

    const { width, height, quality = 'auto', format = 'auto' } = options;
    
    // Build Cloudinary transformation URL
    let transformations: string[] = [];
    
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);
    
    if (transformations.length === 0) {
      return media.url;
    }

    // Extract base URL and insert transformations
    const urlParts = media.url.split('/upload/');
    if (urlParts.length === 2) {
      return `${urlParts[0]}/upload/${transformations.join(',')}/${urlParts[1]}`;
    }
    
    return media.url;
  }

  /**
   * Helper method to generate responsive image URLs
   */
  static getResponsiveImageUrls(media: VariantMedia): {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    original: string;
  } {
    return {
      thumbnail: this.getOptimizedMediaUrl(media, { width: 150, height: 150, quality: 'auto' }),
      small: this.getOptimizedMediaUrl(media, { width: 400, quality: 'auto' }),
      medium: this.getOptimizedMediaUrl(media, { width: 800, quality: 'auto' }),
      large: this.getOptimizedMediaUrl(media, { width: 1200, quality: 'auto' }),
      original: media.url,
    };
  }
}
