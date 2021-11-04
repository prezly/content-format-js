export interface OEmbedInfo {
    version: '1.0';
    url: string;
    type: 'video' | 'photo' | 'rich' | 'link';
    title?: string;
    description?: string;
    screenshot_url?: string;
    thumbnail_url?: string;
    thumbnail_width?: string;
    thumbnail_height?: string;
    author_name?: string;
    author_url?: string;
    provider_name?: string;
    provider_url?: string;
    cache_age?: number;
    html?: string;
    width?: number;
    height?: number;
}

export interface UploadedFile {
    uuid: string;
    version: number;
    filename: string;
    mime_type: string;
    size: number;
}

export interface UploadedImage extends UploadedFile {
    original_height: number;
    original_width: number;
    effects: string[];
}
