import { type ComposedElement } from '../ComposedElement';
import { type Node } from '../Node';

export const LinkNode = {
    TYPE: 'link',
};

export interface LinkNode<Inline extends Node> extends ComposedElement<typeof LinkNode.TYPE> {
    href: string;
    children: Inline[];
}
