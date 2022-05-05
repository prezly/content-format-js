import type { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';
import { isElement } from '../Element';
import { isArrayOf } from '../validation';

export const QuoteNode = {
    TYPE: 'block-quote',
};

export interface QuoteNode<Inline extends Node> extends ComposedElement<typeof QuoteNode.TYPE> {
    children: Inline[];
}

export function isQuoteNode<Quote extends QuoteNode<Inline>, Inline extends Node>(value: any): value is Quote {
    return isElement(value, QuoteNode.TYPE);
}

export function validateQuoteNode<Quote extends QuoteNode<Inline>, Inline extends Node>(
    value: any,
    validateInlineNode: (node: any) => Inline | null,
): Quote | null {
    const isValid =
        isQuoteNode<Quote, Inline>(value) && isArrayOf(value.children, (node) => Boolean(validateInlineNode(node)));

    return isValid ? value : null;
}
