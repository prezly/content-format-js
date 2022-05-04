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
} from './format';

export enum EmailPlaceholder {
    CONTACT_FIRST_NAME = 'contact.firstname',
    CONTACT_LAST_NAME = 'contact.lastname',
    CONTACT_FULL_NAME = 'contact.fullname',
    STORY_URL = 'release.url',
    STORY_SHORT_URL = 'release.shorturl',
}

type Inline = LinkNode<Text> | PlaceholderNode<EmailPlaceholder>;

type RecursiveListNode = ListNode<ListItemTextNode<Inline> | RecursiveListNode>;

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
