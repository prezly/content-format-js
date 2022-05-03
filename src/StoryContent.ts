import type {
    AttachmentNode,
    BookmarkNode,
    ContactNode,
    Document,
    DividerNode,
    EmbedNode,
    GalleryNode,
    ImageNodeWithCaption,
    LinkNode,
    ListNode,
    ListItemTextNode,
    ParagraphNode,
    PlaceholderNode,
    QuoteNode,
    Text,
    VideoNode,
} from './format';
import {
    validateAttachmentNode,
    validateBookmarkNode,
    validateContactNode,
    validateDividerNode,
    validateEmbedNode,
    validateGalleryNode,
    validateImageNodeWithCaption,
    validateLinkNode, validateListItemTextNode, validateListNode,
    validateParagraphNode,
    validatePlaceholderNode,
    validateQuoteNode,
    validateText,
    validateVideoNode,
} from './format';

export enum StoryPlaceholder {
    STORY_PUBLICATION_DATE = 'publication.date',
}

type Inline = PlaceholderNode<StoryPlaceholder> | LinkNode<Text> | Text;

type NestableListNode = ListNode<ListItemTextNode<Inline> | NestableListNode>;

type Block =
    | AttachmentNode
    | BookmarkNode
    | ContactNode
    | DividerNode
    | EmbedNode
    | GalleryNode
    | ImageNodeWithCaption<Inline>
    | NestableListNode
    | ParagraphNode<Inline>
    | QuoteNode<Inline>
    | VideoNode;

export type StoryContent = Document<Block>;

export function validateBlockNode(node: any): Block | null {
    return (
        validateAttachmentNode(node) ??
        validateBookmarkNode(node) ??
        validateContactNode(node) ??
        validateDividerNode(node) ??
        validateEmbedNode(node) ??
        validateGalleryNode(node) ??
        validateImageNodeWithCaption(node, validateInlineNode) ??
        validateNestableListNode(node) ??
        validateParagraphNode(node, validateInlineNode) ??
        validateQuoteNode(node, validateInlineNode) ??
        validateVideoNode(node)
    );
}

export function validateNestableListNode(node: any): NestableListNode | null {
    return validateListNode(node, function (block) {
        return validateListItemTextNode(block, validateInlineNode) ?? validateNestableListNode(block);
    })
}

export function validateInlineNode(node: any): Inline | null {
    return (
        validateText(node) ??
        validateLinkNode(node, validateText) ??
        validatePlaceholderNode(node, (key): key is StoryPlaceholder =>
            Object.values(StoryPlaceholder).includes(key as StoryPlaceholder),
        )
    );
}
