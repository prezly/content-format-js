import * as Core from './model';
import type { Alignable, OptionallyAlignable, Stylable } from './traits';

// TYPES

// Core
export type Document = Core.Document<BlockNode>;
export type Node = InlineNode | BlockNode;
export type ComposedElement = LinkNode | ParagraphNode | QuoteNode | ListNode | ListItemNode | ListItemTextNode;
export type InlineNode = LinkNode | PlaceholderNode | Text;
export type BlockNode =
    | ImageNode
    | AttachmentNode
    | BookmarkNode
    | CoverageNode
    | DividerNode
    | EmbedNode
    | ParagraphNode
    | QuoteNode
    | ListNode
    | StoryBookmarkNode
    | VideoNode;

export enum PlaceholderType {
    CONTACT_FIRST_NAME = 'contact.firstname',
    CONTACT_LAST_NAME = 'contact.lastname',
    CONTACT_FULL_NAME = 'contact.fullname',
    STORY_URL = 'release.url',
    STORY_SHORT_URL = 'release.shorturl',
}

// Inlines
export type Text = Stylable<Core.Text>;
export type LinkNode = Core.LinkNode<Text>;
export type PlaceholderNode = Core.PlaceholderNode<PlaceholderType>;

// Blocks
export type AttachmentNode = Core.AttachmentNode;
export type BookmarkNode = Core.BookmarkNode;
export type CoverageNode = Core.CoverageNode;
export type DividerNode = Core.DividerNode;
export type EmbedNode = Core.EmbedNode;
export type ImageNode = Alignable<Core.ImageNode>;
export type ParagraphNode = OptionallyAlignable<Core.ParagraphNode<InlineNode>>;
export type QuoteNode = OptionallyAlignable<Core.QuoteNode<InlineNode>>;
export type StoryBookmarkNode = Core.StoryBookmarkNode;
export type VideoNode = Core.VideoNode;

// Lists
type RecursiveListNode = Core.ListNode<ListItemTextNode | RecursiveListNode>;

export type ListItemTextNode = Core.ListItemTextNode<InlineNode>;
export type ListItemNode = Core.ListItemNode<ListItemTextNode | RecursiveListNode>;
export type ListNode = Alignable<RecursiveListNode>;

// PUBLIC

export const validate = (value: any): Document | null => Core.validateDocument(value, validateBlockNode);

export const isDocument = (value: any): value is Document => Core.isDocument(value);
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

// PRIVATE

function validateBlockNode(node: any): BlockNode | null {
    return (
        Core.validateAttachmentNode(node) ??
        Core.validateBookmarkNode(node) ??
        Core.validateCoverageNode(node) ??
        Core.validateDividerNode(node) ??
        Core.validateEmbedNode(node) ??
        Core.validateImageNode(node) ??
        validateListNode(node) ??
        Core.validateParagraphNode(node, validateInlineNode) ??
        Core.validateQuoteNode(node, validateInlineNode) ??
        Core.validateStoryBookmarkNode(node) ??
        Core.validateVideoNode(node)
    );
}

function validateListNode(value: any): RecursiveListNode | null {
    return Core.validateListNode(value, function (block) {
        return Core.validateListItemTextNode(block, validateInlineNode) ?? validateListNode(block);
    });
}

function validateInlineNode(value: any): InlineNode | null {
    function isValidPlaceholderKey(key: string): key is PlaceholderType {
        return Object.values(PlaceholderType).includes(key as PlaceholderType);
    }

    return (
        Core.validateText(value) ??
        Core.validateLinkNode(value, Core.validateText) ??
        Core.validatePlaceholderNode(value, isValidPlaceholderKey)
    );
}
