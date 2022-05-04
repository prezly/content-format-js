import { type UploadedImage, isUploadedImage } from '@prezly/uploads';
import { type ComposedElement, isComposedElement } from '../ComposedElement';
import { type Element, isElement } from '../Element';
import type { Node } from '../Node';
import { isArrayOf, isEnum } from '../validation';

export const ImageNode = {
    TYPE: 'image-block',
};

export enum ImageLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export type ImageWidth = `${number}%` | `${number}px`;

const WIDTH_REGEX = /^\d+(\.\d+)?(px|%)$/;

export interface ImageNode extends Element<typeof ImageNode.TYPE> {
    file: UploadedImage;
    layout: ImageLayout;
    width: ImageWidth;
    href: string | null;
}

export interface ImageNodeWithCaption<Child extends Node>
    extends ImageNode,
        ComposedElement<typeof ImageNode.TYPE> {
    children: Child[];
}

export function isImageNode(value: any): value is ImageNode {
    return isElement(value, ImageNode.TYPE);
}

export function isImageNodeWithCaption<
    Image extends ImageNodeWithCaption<Child>,
    Child extends Node,
>(value: any): value is Image {
    return isComposedElement(value, ImageNode.TYPE);
}

export function validateImageNode(value: any): ImageNode | null {
    const isValid =
        isImageNode(value) &&
        (value.href === null || typeof value.href === 'string') &&
        isEnum(value.layout, ImageLayout) &&
        isUploadedImage(value.file) &&
        typeof value.width === 'string' &&
        WIDTH_REGEX.test(value.width);

    return isValid ? value : null;
}

export function validateImageNodeWithCaption<
    Image extends ImageNodeWithCaption<Child>,
    Child extends Node,
>(value: any, validateChildNode: (value: any) => Child | null): Image | null {
    const isValid =
        isImageNodeWithCaption<Image, Child>(value) &&
        Boolean(validateImageNode(value)) &&
        isArrayOf(value.children, (node) => Boolean(validateChildNode(node)));

    return isValid ? value : null;
}
