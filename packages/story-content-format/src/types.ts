import * as Core from '@prezly/content-format';
import type { Alignable, OptionallyAlignable, Stylable } from '@prezly/content-format';

// CORE

export type DocumentNode = Core.DocumentNode<BlockNode>;
export const DocumentNode = Core.DocumentNode;

export type Node = InlineNode | BlockNode;

export type ComposedElement =
    | LinkNode
    | HeadingNode
    | ImageNode
    | ParagraphNode
    | QuoteNode
    | ListNode
    | ListItemNode
    | ListItemTextNode;

export type InlineNode = PlaceholderNode | LinkNode | Text;

export type BlockNode =
    | AttachmentNode
    | BookmarkNode
    | ContactNode
    | DividerNode
    | EmbedNode
    | HeadingNode
    | HtmlNode
    | ImageNode
    | GalleryNode
    | ParagraphNode
    | QuoteNode
    | ListNode
    | StoryBookmarkNode
    | VideoNode;

export enum PlaceholderType {
    STORY_PUBLICATION_DATE = 'publication.date',
}

// NODES

export type HeadingType = Core.HeadingType;
export const HeadingType = Core.HeadingType;

// Inline nodes

export type Text = Stylable<Core.Text>;

export type LinkNode = Core.LinkNode<Text>;
export const LinkNode = Core.LinkNode;

export type PlaceholderNode = Core.PlaceholderNode<PlaceholderType>;
export const PlaceholderNode = Core.PlaceholderNode;

// Block nodes

export type AttachmentNode = Core.AttachmentNode;
export const AttachmentNode = Core.AttachmentNode;

export type BookmarkNode = Core.BookmarkNode;
export const BookmarkNode = Core.BookmarkNode;

export type ContactNode = Core.ContactNode;
export const ContactNode = Core.ContactNode;

export type DividerNode = Core.DividerNode;
export const DividerNode = Core.DividerNode;

export type EmbedNode = Core.EmbedNode;
export const EmbedNode = Core.EmbedNode;

export type GalleryNode = Core.GalleryNode;
export const GalleryNode = Core.GalleryNode;

export type HeadingNode = Core.HeadingNode<HeadingType, InlineNode>;
export const HeadingNode = Core.HeadingNode;

export type HtmlNode = Core.HtmlNode;
export const HtmlNode = Core.HtmlNode;

export type ImageNode = Alignable<Core.ImageNodeWithCaption<Text>>;
export const ImageNode = Core.ImageNode;

export type ParagraphNode = OptionallyAlignable<Core.ParagraphNode<InlineNode>>;
export const ParagraphNode = Core.ParagraphNode;

export type QuoteNode = OptionallyAlignable<Core.QuoteNode<InlineNode>>;
export const QuoteNode = Core.QuoteNode;

export type StoryBookmarkNode = Core.StoryBookmarkNode;
export const StoryBookmarkNode = Core.StoryBookmarkNode;

export type VideoNode = Core.VideoNode;
export const VideoNode = Core.VideoNode;

export type ListItemTextNode = Core.ListItemTextNode<InlineNode>;
export const ListItemTextNode = Core.ListItemTextNode;

export type ListItemNode = Core.ListItemNode<ListItemTextNode | RecursiveListNode>;
export const ListItemNode = Core.ListItemNode;

export type ListNode = OptionallyAlignable<RecursiveListNode>;
export const ListNode = Core.ListNode;

type RecursiveListNode = Core.ListNode<ListItemTextNode | RecursiveListNode>;
