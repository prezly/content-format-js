import { ComposedElement } from '../ComposedElement';
import { Node } from '../Node';

export const ParagraphNode = {
    TYPE: 'paragraph',
};

export interface ParagraphNode<Inline extends Node>
    extends ComposedElement<typeof ParagraphNode.TYPE> {
    children: Inline[];
}
