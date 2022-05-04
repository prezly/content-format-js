import {
    type AttachmentNode,
    type BookmarkNode,
    type CoverageNode,
    type Document,
    type DividerNode,
    type EmbedNode,
    type ImageNode,
    type LinkNode,
    type ListNode,
    type ListItemTextNode,
    type ParagraphNode,
    type PlaceholderNode,
    type QuoteNode,
    type StoryBookmarkNode,
    type Text,
    type VideoNode,
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
} from './format';
import type { Alignable, OptionallyAlignable, Stylable } from './traits';

export enum EmailPlaceholder {
    CONTACT_FIRST_NAME = 'contact.firstname',
    CONTACT_LAST_NAME = 'contact.lastname',
    CONTACT_FULL_NAME = 'contact.fullname',
    STORY_URL = 'release.url',
    STORY_SHORT_URL = 'release.shorturl',
}

type Inline = LinkNode<Text> | PlaceholderNode<EmailPlaceholder> | Stylable<Text>;

type RecursiveListNode = ListNode<ListItemTextNode<Inline> | RecursiveListNode>;

type Block =
    | Alignable<ImageNode>
    | AttachmentNode
    | BookmarkNode
    | CoverageNode
    | DividerNode
    | EmbedNode
    | OptionallyAlignable<ParagraphNode<Inline>>
    | OptionallyAlignable<QuoteNode<Inline>>
    | OptionallyAlignable<RecursiveListNode>
    | StoryBookmarkNode
    | VideoNode;

export type EmailContent = Document<Block>;

export const EmailContent = {
    validate(value: any): EmailContent | null {
        return validateDocument<EmailContent, Block>(value, validateBlockNode);
    },
};

function validateBlockNode(node: any): Block | null {
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

function validateInlineNode(value: any): Inline | null {
    function isValidPlaceholderKey(key: string): key is EmailPlaceholder {
        return Object.values(EmailPlaceholder).includes(key as EmailPlaceholder);
    }

    return (
        validateText(value) ??
        validateLinkNode(value, validateText) ??
        validatePlaceholderNode<PlaceholderNode<EmailPlaceholder>, EmailPlaceholder>(
            value,
            isValidPlaceholderKey,
        )
    );
}
