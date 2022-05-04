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

type NestableListNode = ListNode<ListItemTextNode<Inline> | NestableListNode>;

export type EmailContent = Document<
    | AttachmentNode
    | BookmarkNode
    | CoverageNode
    | DividerNode
    | EmbedNode
    | ImageNode
    | NestableListNode
    | ParagraphNode<Inline>
    | QuoteNode<Inline>
    | VideoNode
>;
