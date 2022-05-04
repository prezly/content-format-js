import * as Model from './model';
import type { Alignable, OptionallyAlignable, Stylable } from './traits';

// PUBLIC

export function validate(value: any): Document | null {
    return Model.validateDocument(value, validateBlockNode);
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
        Model.validateAttachmentNode(node) ??
        Model.validateBookmarkNode(node) ??
        Model.validateContactNode(node) ??
        Model.validateDividerNode(node) ??
        Model.validateEmbedNode(node) ??
        Model.validateGalleryNode(node) ??
        Model.validateImageNodeWithCaption(node, Model.validateText) ??
        validateRecursiveListNode(node) ??
        Model.validateParagraphNode(node, validateInlineNode) ??
        Model.validateQuoteNode(node, validateInlineNode) ??
        Model.validateStoryBookmarkNode(node) ??
        Model.validateVideoNode(node)
    );
}

export function validateRecursiveListNode(node: any): RecursiveListNode | null {
    return Model.validateListNode(node, function (block) {
        return (
            Model.validateListItemTextNode(block, validateInlineNode) ??
            validateRecursiveListNode(block)
        );
    });
}

export function validateInlineNode(node: any): InlineNode | null {
    function isValidPlaceholderKey(key: string): key is PlaceholderType {
        return Object.values(PlaceholderType).includes(key as PlaceholderType);
    }

    return (
        Model.validateText(node) ??
        Model.validateLinkNode(node, Model.validateText) ??
        Model.validatePlaceholderNode(node, isValidPlaceholderKey)
    );
}
