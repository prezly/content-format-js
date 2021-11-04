import { ComposedElement } from '../ComposedElement';
import { Node } from '../Node';

export const ParagraphNode = {
    TYPE: 'paragraph',
};

export interface ParagraphNode<Child extends Node>
    extends ComposedElement<typeof ParagraphNode.TYPE> {
    children: Child[];
}
