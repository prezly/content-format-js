import { type UploadedImage, isUploadedImage } from '@prezly/uploads';
import { Element } from '../Element';
import { isArrayOf, isEnum, isObject, isUuid } from '../validation';

export interface GalleryNode extends Element<typeof GalleryNode.TYPE> {
    uuid: string;
    images: GalleryNode.GalleryImage[];
    layout: GalleryNode.Layout;
    padding: GalleryNode.Padding;
    thumbnail_size: GalleryNode.ImageSize;
}

export namespace GalleryNode {
    export const TYPE = 'gallery';

    export enum Layout {
        CONTAINED = 'contained',
        EXPANDED = 'expanded',
        FULL_WIDTH = 'full-width',
    }

    export enum ImageSize {
        L = 'L',
        M = 'M',
        S = 'S',
        XL = 'XL',
        XS = 'XS',
    }

    export enum Padding {
        L = 'L',
        M = 'M',
        S = 'S',
    }

    export interface GalleryImage {
        file: File;
        caption: string;
    }

    export type File = UploadedImage;

    export function isGalleryNode(value: any): value is GalleryNode {
        return Element.isElement(value, TYPE);
    }

    export function validateGalleryNode(value: any): GalleryNode | null {
        const isValid =
            isGalleryNode(value) &&
            isUuid(value.uuid) &&
            isEnum(value.layout, Layout) &&
            isEnum(value.padding, Padding) &&
            isEnum(value.thumbnail_size, ImageSize) &&
            isArrayOf(value.images, (image) => Boolean(validateGalleryImage(image)));

        return isValid ? value : null;
    }

    export function validateGalleryImage(value: any): GalleryImage | null {
        const isValid = isObject(value) && typeof value.caption === 'string' && isUploadedImage(value.file);

        return isValid ? (value as unknown as GalleryImage) : null;
    }
}
