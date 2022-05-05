import * as Core from '@prezly/content-format';

import type { BlockNode, DocumentNode, InlineNode } from './types';

export function validateDocumentNode(value: any): DocumentNode | null {
    return Core.validateDocumentNode(value, validateBlockNode);
}

export function validateBlockNode(node: any): BlockNode | null {
    return Core.validateParagraphNode(node, validateInlineNode);
}

export function validateInlineNode(node: any): InlineNode | null {
    return Core.validateText(node) ?? Core.validateMentionNode(node);
}
