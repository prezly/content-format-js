import * as Core from './model';
import type { Alignable, OptionallyAlignable, Stylable } from './traits';

// TYPES

// Core
export type Document = Core.Document<BlockNode>;
export type InlineNode = PlaceholderNode | LinkNode | Text;
export type BlockNode =
    | ImageNode
    | AttachmentNode
    | BookmarkNode
    | ContactNode
    | DividerNode
    | EmbedNode
    | GalleryNode
    | ParagraphNode
    | QuoteNode
    | OptionallyAlignable<RecursiveListNode>
    | StoryBookmarkNode
    | VideoNode;

export enum PlaceholderType {
    STORY_PUBLICATION_DATE = 'publication.date',
}

// Inlines
export type Text = Stylable<Core.Text>;
export type LinkNode = Core.LinkNode<Text>;
export type PlaceholderNode = Core.PlaceholderNode<PlaceholderType>;

// Blocks
export type AttachmentNode = Core.AttachmentNode;
export type ImageNode = Alignable<Core.ImageNodeWithCaption<Text>>;
export type BookmarkNode = Core.BookmarkNode;
export type ContactNode = Core.ContactNode;
export type DividerNode = Core.DividerNode;
export type EmbedNode = Core.EmbedNode;
export type GalleryNode = Core.GalleryNode;
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
        Core.validateContactNode(node) ??
        Core.validateDividerNode(node) ??
        Core.validateEmbedNode(node) ??
        Core.validateGalleryNode(node) ??
        Core.validateImageNodeWithCaption(node, Core.validateText) ??
        validateListNode(node) ??
        Core.validateParagraphNode(node, validateInlineNode) ??
        Core.validateQuoteNode(node, validateInlineNode) ??
        Core.validateStoryBookmarkNode(node) ??
        Core.validateVideoNode(node)
    );
}

function validateListNode(node: any): RecursiveListNode | null {
    return Core.validateListNode(node, function (block) {
        return (
            Core.validateListItemTextNode(block, validateInlineNode) ??
            validateListNode(block)
        );
    });
}

function validateInlineNode(node: any): InlineNode | null {
    function isValidPlaceholderKey(key: string): key is PlaceholderType {
        return Object.values(PlaceholderType).includes(key as PlaceholderType);
    }

    return (
        Core.validateText(node) ??
        Core.validateLinkNode(node, Core.validateText) ??
        Core.validatePlaceholderNode(node, isValidPlaceholderKey)
    );
}
