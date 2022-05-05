import * as Core from '@prezly/content-format';
import type {
    BlockNode,
    ComposedElement,
    DocumentNode,
    HeadingNode,
    HeadingType,
    ImageNode,
    InlineNode,
    LinkNode,
    ListItemNode,
    ListItemTextNode,
    ListNode,
    Node,
    ParagraphNode,
    PlaceholderNode,
    QuoteNode,
    Text,
} from './types';

export const isDocument = (value: any): value is DocumentNode => Core.isDocumentNode(value);
export const isNode = (value: any): value is Node => Core.isNode(value);
export const isComposedElement = (value: any): value is ComposedElement => Core.isComposedElement(value);

// Inlines
export const isText = (value: any): value is Text => Core.isText(value);
export const isLinkNode = (value: any): value is LinkNode => Core.isLinkNode(value);
export const isPlaceholderNode = (value: any): value is PlaceholderNode => Core.isPlaceholderNode(value);

// Blocks
export const isAttachmentNode = Core.isAttachmentNode;
export const isBookmarkNode = Core.isBookmarkNode;
export const isCoverageNode = Core.isCoverageNode;
export const isDividerNode = Core.isDividerNode;
export const isEmbedNode = Core.isEmbedNode;
export const isHeadingNode = (value: any, type?: HeadingType): value is HeadingNode =>
    type ? Core.isHeadingNode(value, type) : Core.isHeadingNode(value);
export const isImageNode = (value: any): value is ImageNode => Core.isImageNode(value);
export const isListNode = (value: any): value is ListNode => Core.isListNode(value);
export const isListItemNode = (value: any): value is ListItemNode => Core.isListItemNode(value);
export const isListItemTextNode = (value: any): value is ListItemTextNode => Core.isListItemTextNode(value);
export const isParagraphNode = (value: any): value is ParagraphNode => Core.isParagraphNode(value);
export const isQuoteNode = (value: any): value is QuoteNode => Core.isQuoteNode(value);
export const isStoryBookmarkNode = Core.isStoryBookmarkNode;
export const isVideoNode = Core.isVideoNode;

// Groups
export function isInlineNode(value: any): value is InlineNode {
    return isText(value) || isLinkNode(value) || isPlaceholderNode(value);
}

export function isBlockNode(value: any): value is BlockNode {
    return (
        isAttachmentNode(value) ||
        isBookmarkNode(value) ||
        isCoverageNode(value) ||
        isDividerNode(value) ||
        isEmbedNode(value) ||
        isHeadingNode(value) ||
        isImageNode(value) ||
        isListNode(value) ||
        isListItemNode(value) ||
        isListItemTextNode(value) ||
        isParagraphNode(value) ||
        isQuoteNode(value) ||
        isStoryBookmarkNode(value) ||
        isVideoNode(value)
    );
}
