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
} from './format';

export enum StoryPlaceholder {
    STORY_PUBLICATION_DATE = 'publication.date',
}

type Inline = PlaceholderNode<StoryPlaceholder> | LinkNode<Text>;

type NestableListNode = ListNode<ListItemTextNode<Inline> | NestableListNode>;

export type StoryContent = Document<
    | AttachmentNode
    | BookmarkNode
    | ContactNode
    | DividerNode
    | EmbedNode
    | GalleryNode
    | ImageNodeWithCaption<Inline>
    | NestableListNode
    | ParagraphNode<Inline>
    | QuoteNode<Inline>
    | VideoNode
>;
