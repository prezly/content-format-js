import type { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';

export const QuoteNode = {
    TYPE: 'block-quote',
};

export interface QuoteNode<Inline extends Node> extends ComposedElement<typeof QuoteNode.TYPE> {
    children: Inline[];
}
