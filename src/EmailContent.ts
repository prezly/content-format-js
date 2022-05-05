import * as Core from './model';
import type { Alignable, OptionallyAlignable, Stylable } from './traits';

// TYPES

// Core
export type Document = Core.Document<BlockNode>;
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
export type ImageNode = Alignable<Core.ImageNode>;
export type BookmarkNode = Core.BookmarkNode;
export type CoverageNode = Core.CoverageNode;
export type DividerNode = Core.DividerNode;
export type EmbedNode = Core.EmbedNode;
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

export function validate(value: any): Document | null {
    return Core.validateDocument(value, validateBlockNode);
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
        return (
            Core.validateListItemTextNode(block, validateInlineNode) ??
            validateListNode(block)
        );
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
