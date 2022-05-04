import { type ComposedElement, isComposedElement } from './ComposedElement';
import type { Element } from './Element';
import { isArrayOf, isNonEmptyString } from './validation';

export const Document = {
    TYPE: 'document',
};

export interface Document<Block extends Element>
    extends ComposedElement<typeof Document.TYPE, Block> {
    version: string;
}

export function isDocument<Doc extends Document<Block>, Block extends Element>(
    value: any,
): value is Doc {
    return isComposedElement(value, Document.TYPE);
}

export function validateDocument<Doc extends Document<Block>, Block extends Element>(
    value: any,
    validateBlockNode: (node: any) => Block | null,
): Doc | null {
    const isValid =
        isDocument<Doc, Block>(value) &&
        isNonEmptyString(value.version) &&
        isArrayOf(value.children, (node) => Boolean(validateBlockNode(node)));

    return isValid ? value : null;
}
