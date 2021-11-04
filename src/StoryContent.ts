import {
    AttachmentNode,
    ContactNode,
    Document,
    DividerNode,
    EmbedNode,
    GalleryNode,
    ImageNodeWithCaption,
    LinkNode,
    ParagraphNode,
    PlaceholderNode,
    QuoteNode,
    Text,
} from './format';

export enum StoryPlaceholder {
    STORY_PUBLICATION_DATE = 'publication.date',
}

type Inline = PlaceholderNode<StoryPlaceholder> | LinkNode<Text>;

export type StoryContent = Document<
    | AttachmentNode
    | ContactNode
    | DividerNode
    | EmbedNode
    | GalleryNode
    | ImageNodeWithCaption<Inline>
    | ParagraphNode<Inline>
    | QuoteNode<Inline>
>;
