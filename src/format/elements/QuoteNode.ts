import { ComposedElement } from '../ComposedElement';
import { Node } from '../Node';

export const QuoteNode = {
    TYPE: 'block-quote',
};

export interface QuoteNode<Child extends Node> extends ComposedElement<typeof QuoteNode.TYPE> {
    children: Child[];
}
