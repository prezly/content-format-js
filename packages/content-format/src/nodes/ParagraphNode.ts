import { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';

export interface ParagraphNode<Child extends Node> extends ComposedElement<typeof ParagraphNode.TYPE, Child> {}

export namespace ParagraphNode {
    export const TYPE = 'paragraph';

    export function isParagraphNode<T extends ParagraphNode<Child>, Child extends Node>(value: any): value is T {
        return ComposedElement.isComposedElement(value, ParagraphNode.TYPE);
    }

    export function validateParagraphNode<Paragraph extends ParagraphNode<Child>, Child extends Node>(
        value: any,
        validateChildNode: (value: any) => Child | null,
    ): Paragraph | null {
        const isValid = ComposedElement.validateComposedElement(value, TYPE, validateChildNode);

        return isValid ? value : null;
    }
}
