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
import type { Alignable, OptionallyAlignable } from './traits';

export enum StoryPlaceholder {
    STORY_PUBLICATION_DATE = 'publication.date',
}

type Inline = PlaceholderNode<StoryPlaceholder> | LinkNode<Text> | Text;

type RecursiveListNode = OptionallyAlignable<ListNode<ListItemTextNode<Inline> | RecursiveListNode>>;

type Block =
    | AttachmentNode
    | BookmarkNode
    | ContactNode
    | DividerNode
    | EmbedNode
    | GalleryNode
    | Alignable<ImageNodeWithCaption<Inline>>
    | RecursiveListNode
    | OptionallyAlignable<ParagraphNode<Inline>>
    | OptionallyAlignable<QuoteNode<Inline>>
    | VideoNode;

export type StoryContent = Document<Block>;
