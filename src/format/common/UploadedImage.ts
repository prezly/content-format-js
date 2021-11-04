import { UploadedFile } from './UploadedFile';

export interface UploadedImage extends UploadedFile {
    original_height: number;
    original_width: number;
    effects: string[];
}
