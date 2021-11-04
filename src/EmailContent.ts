import type {
    AttachmentNode,
    CoverageNode,
    Document,
    DividerNode,
    EmbedNode,
    ImageNode,
    LinkNode,
    ParagraphNode,
    PlaceholderNode,
    QuoteNode,
    Text,
} from './format';

export enum EmailPlaceholder {
    CONTACT_FIRST_NAME = 'contact.firstname',
    CONTACT_LAST_NAME = 'contact.lastname',
    CONTACT_FULL_NAME = 'contact.fullname',
    STORY_URL = 'release.url',
    STORY_SHORT_URL = 'release.shorturl',
}

type Inline = LinkNode<Text> | PlaceholderNode<EmailPlaceholder>;

export type EmailContent = Document<
    | AttachmentNode
    | CoverageNode
    | DividerNode
    | EmbedNode
    | ImageNode
    | ParagraphNode<Inline>
    | QuoteNode<Inline>
>;
