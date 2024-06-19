import { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';

export interface CalloutNode<Inline extends Node> extends ComposedElement<typeof CalloutNode.TYPE, Inline> {}

export namespace CalloutNode {
    export const TYPE = 'callout';

    export function isCalloutNode<T extends CalloutNode<Inline>, Inline extends Node>(value: any): value is T {
        return ComposedElement.isComposedElement(value, CalloutNode.TYPE);
    }

    export function validateCalloutNode<Quote extends CalloutNode<Inline>, Inline extends Node>(
        value: any,
        validateInlineNode: (node: any) => Inline | null,
    ): Quote | null {
        const isValid =
            ComposedElement.validateComposedElement(value, TYPE, validateInlineNode) &&
            (typeof value.icon === 'string' || typeof value.icon === 'undefined') &&
            (typeof value.align === 'string' || typeof value.align === 'undefined');

        return isValid ? value : null;
    }
}
