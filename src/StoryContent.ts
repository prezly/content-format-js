import type {
    AttachmentNode,
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
} from './format';

export enum StoryPlaceholder {
    STORY_PUBLICATION_DATE = 'publication.date',
}

type Inline = PlaceholderNode<StoryPlaceholder> | LinkNode<Text>;

type NestableListNode = ListNode<ListItemTextNode<Inline> | NestableListNode>;

export type StoryContent = Document<
    | AttachmentNode
    | ContactNode
    | DividerNode
    | EmbedNode
    | GalleryNode
    | ImageNodeWithCaption<Inline>
    | NestableListNode
    | ParagraphNode<Inline>
    | QuoteNode<Inline>
>;
