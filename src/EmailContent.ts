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
