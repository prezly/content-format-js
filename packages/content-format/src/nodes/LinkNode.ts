import { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';
import { isArrayOf, isNonEmptyString } from '../validation';

export interface LinkNode<Inline extends Node> extends ComposedElement<typeof LinkNode.TYPE, Inline> {
    href: string;
    new_tab: boolean;
}

export namespace LinkNode {
    export const TYPE = 'link';

    export function isLinkNode<Link extends LinkNode<Inline>, Inline extends Node>(value: any): value is Link {
        return ComposedElement.isComposedElement(value, TYPE);
    }

    export function validateLinkNode<Link extends LinkNode<Inline>, Inline extends Node>(
        value: any,
        validateInlineNode: (node: any) => Inline | null,
    ): Link | null {
        const isValid =
            isLinkNode<Link, Inline>(value) &&
            isNonEmptyString(value.href) &&
            isArrayOf(value.children, (node) => Boolean(validateInlineNode(node)));

        return isValid ? value : null;
    }
}
