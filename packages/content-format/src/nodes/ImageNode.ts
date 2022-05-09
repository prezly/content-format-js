import { type UploadedImage, isUploadedImage } from '@prezly/uploads';
import { Element } from '../Element';
import { isBoolean, isEnum } from '../validation';

export interface ImageNode extends Element<typeof ImageNode.TYPE> {
    file: ImageNode.File;
    layout: ImageNode.Layout;
    width: ImageNode.Width;
    new_tab: boolean;
    href: string | null;
}

export namespace ImageNode {
    export const TYPE = 'image-block';

    export type File = UploadedImage;

    export type Width = `${number}%` | `${number}px`;

    export enum Layout {
        CONTAINED = 'contained',
        EXPANDED = 'expanded',
        FULL_WIDTH = 'full-width',
    }

    const WIDTH_REGEX = /^\d+(\.\d+)?(px|%)$/;

    export function isImageNode(value: any): value is ImageNode {
        return Element.isElement(value, TYPE);
    }

    export function validateImageNode(value: any): ImageNode | null {
        const isValid =
            isImageNode(value) &&
            (value.href === null || typeof value.href === 'string') &&
            isBoolean(value.new_tab) &&
            isEnum(value.layout, Layout) &&
            isUploadedImage(value.file) &&
            typeof value.width === 'string' &&
            WIDTH_REGEX.test(value.width);

        return isValid ? value : null;
    }
}
