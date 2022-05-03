import { Element } from './Element';
import { isArrayOf } from './validation';

export const Document = {
    TYPE: 'document',
};

export interface Document<Block extends Element> {
    type: typeof Document.TYPE;
    version: string;
    children: Block[];
}

export function isDocument<Doc extends Document<Block>, Block extends Element>(
    value: any,
): value is Doc {
    return (
        value &&
        typeof value === 'object' &&
        value.type === Document.TYPE &&
        typeof value.version === 'string' &&
        Array.isArray(value.children)
    );
}

export function validateDocument<Doc extends Document<Block>, Block extends Element>(
    value: any,
    validateBlockNode: (node: any) => Block | null,
): Doc | null {
    const isValid =
        isDocument<Doc, Block>(value) &&
        isArrayOf(value.children, (node) => Boolean(validateBlockNode(node)));

    return isValid ? value : null;
}
