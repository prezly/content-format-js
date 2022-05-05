import * as Core from '@prezly/content-format';
import { BlockNode, DocumentNode, InlineNode, ListNode, PlaceholderType } from './types';

export function validateDocument(value: any): DocumentNode | null {
    return Core.validateDocumentNode(value, validateBlockNode);
}

export function validateBlockNode(node: any): BlockNode | null {
    return (
        Core.validateAttachmentNode(node) ??
        Core.validateBookmarkNode(node) ??
        Core.validateContactNode(node) ??
        Core.validateDividerNode(node) ??
        Core.validateEmbedNode(node) ??
        Core.validateGalleryNode(node) ??
        Core.validateHeadingNode(node, validateInlineNode) ??
        Core.validateHtmlNode(node) ??
        Core.validateImageNodeWithCaption(node, Core.validateText) ??
        validateListNode(node) ??
        Core.validateParagraphNode(node, validateInlineNode) ??
        Core.validateQuoteNode(node, validateInlineNode) ??
        Core.validateStoryBookmarkNode(node) ??
        Core.validateVideoNode(node)
    );
}

export function validateListNode(node: any): ListNode | null {
    return Core.validateListNode(node, function (block) {
        return Core.validateListItemTextNode(block, validateInlineNode) ?? validateListNode(block);
    });
}

export function validateInlineNode(node: any): InlineNode | null {
    function isValidPlaceholderKey(key: string): key is PlaceholderType {
        return Object.values(PlaceholderType).includes(key as PlaceholderType);
    }

    return (
        Core.validateText(node) ??
        Core.validateLinkNode(node, Core.validateText) ??
        Core.validatePlaceholderNode(node, isValidPlaceholderKey)
    );
}
