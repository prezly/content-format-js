import type * as Model from './model';
import {
    validateAttachmentNode,
    validateBookmarkNode,
    validateContactNode,
    validateDividerNode,
    validateDocument,
    validateEmbedNode,
    validateGalleryNode,
    validateImageNodeWithCaption,
    validateLinkNode,
    validateListItemTextNode,
    validateListNode,
    validateParagraphNode,
    validatePlaceholderNode,
    validateQuoteNode,
    validateStoryBookmarkNode,
    validateText,
    validateVideoNode,
} from './model';
import type { Alignable, OptionallyAlignable, Stylable } from './traits';

// PUBLIC

export function validate(value: any): Document | null {
    return validateDocument(value, validateBlockNode);
}

// Core
export type Document = Model.Document<BlockNode>;
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
export type Text = Stylable<Model.Text>;
export type LinkNode = Model.LinkNode<Text>;
export type PlaceholderNode = Model.PlaceholderNode<PlaceholderType>;

// Blocks
export type AttachmentNode = Model.AttachmentNode;
export type ImageNode = Alignable<Model.ImageNodeWithCaption<Text>>;
export type BookmarkNode = Model.BookmarkNode;
export type ContactNode = Model.ContactNode;
export type DividerNode = Model.DividerNode;
export type EmbedNode = Model.EmbedNode;
export type GalleryNode = Model.GalleryNode;
export type ParagraphNode = OptionallyAlignable<Model.ParagraphNode<InlineNode>>;
export type QuoteNode = OptionallyAlignable<Model.QuoteNode<InlineNode>>;
export type StoryBookmarkNode = Model.StoryBookmarkNode;
export type VideoNode = Model.VideoNode;

// Lists
type RecursiveListNode = Model.ListNode<ListItemTextNode | RecursiveListNode>;

export type ListItemTextNode = Model.ListItemTextNode<InlineNode>;
export type ListItemNode = Model.ListItemNode<ListItemTextNode | RecursiveListNode>;
export type ListNode = Alignable<RecursiveListNode>;

// PRIVATE

export function validateBlockNode(node: any): BlockNode | null {
    return (
        validateAttachmentNode(node) ??
        validateBookmarkNode(node) ??
        validateContactNode(node) ??
        validateDividerNode(node) ??
        validateEmbedNode(node) ??
        validateGalleryNode(node) ??
        validateImageNodeWithCaption(node, validateText) ??
        validateRecursiveListNode(node) ??
        validateParagraphNode(node, validateInlineNode) ??
        validateQuoteNode(node, validateInlineNode) ??
        validateStoryBookmarkNode(node) ??
        validateVideoNode(node)
    );
}

export function validateRecursiveListNode(node: any): RecursiveListNode | null {
    return validateListNode(node, function (block) {
        return (
            validateListItemTextNode(block, validateInlineNode) ?? validateRecursiveListNode(block)
        );
    });
}

export function validateInlineNode(node: any): InlineNode | null {
    function isValidPlaceholderKey(key: string): key is PlaceholderType {
        return Object.values(PlaceholderType).includes(key as PlaceholderType);
    }

    return (
        validateText(node) ??
        validateLinkNode(node, validateText) ??
        validatePlaceholderNode(node, isValidPlaceholderKey)
    );
}
