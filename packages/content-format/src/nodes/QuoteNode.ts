import { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';

export interface QuoteNode<Inline extends Node> extends ComposedElement<typeof QuoteNode.TYPE, Inline> {}

export namespace QuoteNode {
    export const TYPE = 'block-quote';

    export function isQuoteNode<Quote extends QuoteNode<Inline>, Inline extends Node>(value: any): value is Quote {
        return ComposedElement.isComposedElement(value, QuoteNode.TYPE);
    }

    export function validateQuoteNode<Quote extends QuoteNode<Inline>, Inline extends Node>(
        value: any,
        validateInlineNode: (node: any) => Inline | null,
    ): Quote | null {
        const isValid = ComposedElement.validateComposedElement(value, TYPE, validateInlineNode);

        return isValid ? value : null;
    }
}
