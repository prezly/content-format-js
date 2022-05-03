import {
    type AttachmentNode,
    type BookmarkNode,
    type ContactNode,
    type Document,
    type DividerNode,
    type EmbedNode,
    type GalleryNode,
    type ImageNodeWithCaption,
    type LinkNode,
    type ListNode,
    type ListItemTextNode,
    type ParagraphNode,
    type PlaceholderNode,
    type QuoteNode,
    type Text,
    type VideoNode,
    validateAttachmentNode,
    validateBookmarkNode,
    validateContactNode,
    validateDividerNode,
    validateEmbedNode,
    validateGalleryNode,
    validateImageNodeWithCaption,
    validateLinkNode,
    validateListItemTextNode,
    validateListNode,
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

interface RecursiveListNode extends ListNode<ListItemTextNode<Inline> | RecursiveListNode> {
}

type Block =
    | AttachmentNode
    | BookmarkNode
    | ContactNode
    | DividerNode
    | EmbedNode
    | GalleryNode
    | ImageNodeWithCaption<Inline>
    | RecursiveListNode
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
        validateRecursiveListNode(node) ??
        validateParagraphNode(node, validateInlineNode) ??
        validateQuoteNode(node, validateInlineNode) ??
        validateVideoNode(node)
    );
}

export function validateRecursiveListNode(node: any): RecursiveListNode | null {
    return validateListNode(node, function (block) {
        return validateListItemTextNode(block, validateInlineNode) ?? validateRecursiveListNode(block);
    })
}

export function validateInlineNode(node: any): Inline | null {
    function isValidPlaceholderKey(key: string): key is StoryPlaceholder {
        return Object.values(StoryPlaceholder).includes(key as StoryPlaceholder);
    }

    return (
        validateText(node) ??
        validateLinkNode(node, validateText) ??
        validatePlaceholderNode(node, isValidPlaceholderKey)
    );
}
