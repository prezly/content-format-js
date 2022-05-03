import type {
    AttachmentNode,
    BookmarkNode,
    CoverageNode,
    Document,
    DividerNode,
    EmbedNode,
    ImageNode,
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

interface RecursiveListNode extends ListNode<ListItemTextNode<Inline> | RecursiveListNode> {}

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

export function validateEmailContent(value: any): EmailContent | null {
    return validateDocument<EmailContent, Block>(value, validateBlock);
}

function validateBlock(value: any): Block | null {
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
