import type { UploadedImage } from '@prezly/uploads';
import type { ComposedElement } from '../ComposedElement';
import type { Element } from '../Element';
import type { Node } from '../Node';

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

export interface ImageNodeWithCaption<Inline extends Node>
    extends ImageNode,
        ComposedElement<typeof ImageNode.TYPE> {
    children: Inline[];
}
