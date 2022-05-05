import * as Core from '@prezly/content-format';
import { BlockNode, DocumentNode, InlineNode, ListNode, PlaceholderType } from './types';

export function validateDocumentNode(value: any): DocumentNode | null {
    return Core.validateDocumentNode(value, validateBlockNode);
}

export function validateBlockNode(node: any): BlockNode | null {
    return (
        Core.validateAttachmentNode(node) ??
        Core.validateBookmarkNode(node) ??
        Core.validateCoverageNode(node) ??
        Core.validateDividerNode(node) ??
        Core.validateEmbedNode(node) ??
        Core.validateImageNode(node) ??
        Core.validateHeadingNode(node, validateInlineNode) ??
        validateListNode(node) ??
        Core.validateParagraphNode(node, validateInlineNode) ??
        Core.validateQuoteNode(node, validateInlineNode) ??
        Core.validateStoryBookmarkNode(node) ??
        Core.validateVideoNode(node)
    );
}

export function validateListNode(value: any): ListNode | null {
    return Core.validateListNode(value, function (block) {
        return Core.validateListItemTextNode(block, validateInlineNode) ?? validateListNode(block);
    }) as ListNode | null;
}

export function validateInlineNode(value: any): InlineNode | null {
    function isValidPlaceholderKey(key: string): key is PlaceholderType {
        return Object.values(PlaceholderType).includes(key as PlaceholderType);
    }

    return (
        Core.validateText(value) ??
        Core.validateLinkNode(value, Core.validateText) ??
        Core.validatePlaceholderNode(value, isValidPlaceholderKey)
    );
}
