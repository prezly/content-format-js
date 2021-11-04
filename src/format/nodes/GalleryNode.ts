import type { UploadedImage } from '../common';
import type { ElementNode } from './ElementNode';

export enum GalleryLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export enum GalleryImageSize {
    L = 'L',
    M = 'M',
    S = 'S',
    XL = 'XL',
    XS = 'XS',
}

export enum GalleryPadding {
    L = 'L',
    M = 'M',
    S = 'S',
}

export interface GalleryImage {
    file: UploadedImage;
    caption: string;
}

export interface GalleryNode extends ElementNode {
    type: 'gallery';
    uuid: string;
    images: GalleryImage[];
    layout: GalleryLayout;
    padding: GalleryPadding;
    thumbnail_size: GalleryImageSize;
}
