import type * as Model from './model';
import {
    validateAttachmentNode,
    validateBookmarkNode,
    validateCoverageNode,
    validateDividerNode,
    validateDocument,
    validateEmbedNode,
    validateImageNode,
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
export type Text = Stylable<Model.Text>;
export type LinkNode = Model.LinkNode<Text>;
export type PlaceholderNode = Model.PlaceholderNode<PlaceholderType>;

// Blocks
export type AttachmentNode = Model.AttachmentNode;
export type ImageNode = Alignable<Model.ImageNode>;
export type BookmarkNode = Model.BookmarkNode;
export type CoverageNode = Model.CoverageNode;
export type DividerNode = Model.DividerNode;
export type EmbedNode = Model.EmbedNode;
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

function validateBlockNode(node: any): BlockNode | null {
    return (
        validateAttachmentNode(node) ??
        validateBookmarkNode(node) ??
        validateCoverageNode(node) ??
        validateDividerNode(node) ??
        validateEmbedNode(node) ??
        validateImageNode(node) ??
        validateRecursiveListNode(node) ??
        validateParagraphNode(node, validateInlineNode) ??
        validateQuoteNode(node, validateInlineNode) ??
        validateStoryBookmarkNode(node) ??
        validateVideoNode(node)
    );
}

function validateRecursiveListNode(value: any): RecursiveListNode | null {
    return validateListNode(value, function (block) {
        return (
            validateListItemTextNode(block, validateInlineNode) ?? validateRecursiveListNode(block)
        );
    });
}

function validateInlineNode(value: any): InlineNode | null {
    function isValidPlaceholderKey(key: string): key is PlaceholderType {
        return Object.values(PlaceholderType).includes(key as PlaceholderType);
    }

    return (
        validateText(value) ??
        validateLinkNode(value, validateText) ??
        validatePlaceholderNode(value, isValidPlaceholderKey)
    );
}
