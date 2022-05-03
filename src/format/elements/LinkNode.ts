import type { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';
import { isElement } from '../Element';
import { isArrayOf, isNonEmptyString } from '../validation';

export const LinkNode = {
    TYPE: 'link',
};

export interface LinkNode<Inline extends Node> extends ComposedElement<typeof LinkNode.TYPE> {
    href: string;
    children: Inline[];
}

export function isLinkNode<Link extends LinkNode<Inline>, Inline extends Node>(
    value: any,
): value is Link {
    return isElement(value, LinkNode.TYPE);
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
