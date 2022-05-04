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
import { type Alignable, type OptionallyAlignable } from './traits';

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
