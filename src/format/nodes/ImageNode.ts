import type { UploadedImage } from '../common';
import type { ElementNode } from './ElementNode';

export enum ImageLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

/**
 * Matches this regexp: /^\d+(\.\d+)?%$/
 */
export type ImageWidth = string;

export interface ImageNode extends ElementNode {
    type: 'image-block';
    file: UploadedImage;
    layout: ImageLayout;
    width: ImageWidth;
    width_factor: ImageWidth;
    href: string | null;
}

export interface ImageNodeWithCaption<Child> extends ImageNode {
    children: Child[];
}
