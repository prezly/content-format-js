import type { UploadedImage } from '@prezly/uploads';
import type { Element } from '../Element';
import { isElement } from '../Element';
import { isArrayOf, isEnum, isObject, isUuid } from '../validation';
import { isUploadedImage } from '@prezly/uploads';

export const GalleryNode = {
    TYPE: 'gallery',
};

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

export interface GalleryNode extends Element<typeof GalleryNode.TYPE> {
    uuid: string;
    images: GalleryImage[];
    layout: GalleryLayout;
    padding: GalleryPadding;
    thumbnail_size: GalleryImageSize;
}

export function isGalleryNode(value: any): value is GalleryNode {
    return isElement(value, GalleryNode.TYPE);
}

export function validateGalleryNode(value: any): GalleryNode | null {
    const isValid =
        isGalleryNode(value) &&
        isUuid(value.uuid) &&
        isEnum(value.layout, GalleryLayout) &&
        isEnum(value.padding, GalleryPadding) &&
        isEnum(value.thumbnail_size, GalleryImageSize) &&
        isArrayOf(value.images, (image) => Boolean(validateGalleryImage(image)));

    return isValid ? value : null;
}

function validateGalleryImage(value: any): GalleryImage | null {
    const isValid =
        isObject(value) && typeof value.caption === 'string' && isUploadedImage(value.file);

    return isValid ? (value as unknown as GalleryImage) : null;
}
