import { type ComposedElement } from '../ComposedElement';
import { type Node } from '../Node';
import { isElement } from '../Element';
import { isArrayOf } from '../validation';

export const ParagraphNode = {
    TYPE: 'paragraph',
};

export interface ParagraphNode<Child extends Node>
    extends ComposedElement<typeof ParagraphNode.TYPE> {
    children: Child[];
}

export function isParagraphNode<T extends ParagraphNode<Child>, Child extends Node>(
    value: any,
): value is T {
    return isElement(value, ParagraphNode.TYPE);
}

export function validateParagraphNode<Paragraph extends ParagraphNode<Child>, Child extends Node>(
    value: any,
    validateChildNode: (value: any) => Child | null,
): Paragraph | null {
    const isValid =
        isParagraphNode<Paragraph, Child>(value) &&
        isArrayOf(value.children, (node) => Boolean(validateChildNode(node)));

    return isValid ? value : null;
}
