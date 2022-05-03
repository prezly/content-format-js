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
    validateText,
    validateVideoNode,
} from './format';

export enum EmailPlaceholder {
    CONTACT_FIRST_NAME = 'contact.firstname',
    CONTACT_LAST_NAME = 'contact.lastname',
    CONTACT_FULL_NAME = 'contact.fullname',
    STORY_URL = 'release.url',
    STORY_SHORT_URL = 'release.shorturl',
}

type Inline = LinkNode<Text> | PlaceholderNode<EmailPlaceholder> | Text;

interface RecursiveListNode extends ListNode<ListItemTextNode<Inline> | RecursiveListNode> {
}

type Block =
    | AttachmentNode
    | BookmarkNode
    | CoverageNode
    | DividerNode
    | EmbedNode
    | ImageNode
    | RecursiveListNode
    | ParagraphNode<Inline>
    | QuoteNode<Inline>
    | VideoNode;

export type EmailContent = Document<Block>;

export const EmailContent = {
    validate(value: any): EmailContent | null {
        return validateDocument<EmailContent, Block>(value, validateBlockNode);
    }
}

function validateBlockNode(value: any): Block | null {
    return (
        validateAttachmentNode(value) ??
        validateBookmarkNode(value) ??
        validateCoverageNode(value) ??
        validateDividerNode(value) ??
        validateEmbedNode(value) ??
        validateImageNode(value) ??
        validateRecursiveListNode(value) ??
        validateParagraphNode(value, validateInlineNode) ??
        validateQuoteNode(value, validateInlineNode) ??
        validateVideoNode(value)
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
