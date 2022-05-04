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
    StoryBookmarkNode,
    Text,
    VideoNode,
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

type RecursiveListNode = OptionallyAlignable<
    ListNode<ListItemTextNode<Inline> | RecursiveListNode>
>;

type Block =
    | AttachmentNode
    | BookmarkNode
    | CoverageNode
    | DividerNode
    | EmbedNode
    | Alignable<ImageNode>
    | RecursiveListNode
    | OptionallyAlignable<ParagraphNode<Inline>>
    | OptionallyAlignable<QuoteNode<Inline>>
    | StoryBookmarkNode
    | VideoNode;

export type EmailContent = Document<Block>;
