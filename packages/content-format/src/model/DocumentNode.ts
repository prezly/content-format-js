import { type ComposedElement, isComposedElement } from './ComposedElement';
import type { Element } from './Element';
import { isArrayOf, isNonEmptyString } from './validation';

export const DocumentNode = {
    TYPE: 'document',
};

export interface DocumentNode<Block extends Element> extends ComposedElement<typeof DocumentNode.TYPE, Block> {
    version: string;
}

export function isDocumentNode<Doc extends DocumentNode<Block>, Block extends Element>(value: any): value is Doc {
    return isComposedElement(value, DocumentNode.TYPE);
}

export function validateDocumentNode<Document extends DocumentNode<Block>, Block extends Element>(
    value: any,
    validateBlockNode: (node: any) => Block | null,
): Document | null {
    const isValid =
        isDocumentNode<Document, Block>(value) &&
        isNonEmptyString(value.version) &&
        isArrayOf(value.children, (node) => Boolean(validateBlockNode(node)));

    return isValid ? value : null;
}
