import { ComposedElement } from '../ComposedElement';
import { Node } from '../Node';

export const QuoteNode = {
    TYPE: 'block-quote',
};

export interface QuoteNode<Inline extends Node> extends ComposedElement<typeof QuoteNode.TYPE> {
    children: Inline[];
}
