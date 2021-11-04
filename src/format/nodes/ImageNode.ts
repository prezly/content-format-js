import type { UploadedImage } from '../common';
import type { Element } from './Element';

export const ImageNode = {
    TYPE: 'image-block',
};

export enum ImageLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

/**
 * Matches this regexp: /^\d+(\.\d+)?%$/
 */
export type ImageWidth = string;

export interface ImageNode extends Element<typeof ImageNode.TYPE> {
    file: UploadedImage;
    layout: ImageLayout;
    width: ImageWidth;
    width_factor: ImageWidth;
    href: string | null;
}

export interface ImageNodeWithCaption<Child> extends ImageNode {
    children: Child[];
}
