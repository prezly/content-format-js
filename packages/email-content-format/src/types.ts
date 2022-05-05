import * as Core from '@prezly/content-format';
import type { Alignable, OptionallyAlignable, Stylable } from '@prezly/content-format';

// CORE

export type DocumentNode = Core.DocumentNode<BlockNode>;
export const DocumentNode = Core.DocumentNode;

export type Node = InlineNode | BlockNode;

export type InlineNode = LinkNode | PlaceholderNode | Text;

export type BlockNode =
    | AttachmentNode
    | BookmarkNode
    | CoverageNode
    | DividerNode
    | EmbedNode
    | HeadingNode
    | ImageNode
    | ParagraphNode
    | QuoteNode
    | ListNode
    | StoryBookmarkNode
    | VideoNode;

export type ComposedElement =
    | LinkNode
    | HeadingNode
    | ParagraphNode
    | QuoteNode
    | ListNode
    | ListItemNode
    | ListItemTextNode;

export enum PlaceholderType {
    CONTACT_FIRST_NAME = 'contact.firstname',
    CONTACT_LAST_NAME = 'contact.lastname',
    CONTACT_FULL_NAME = 'contact.fullname',
    STORY_URL = 'release.url',
    STORY_SHORT_URL = 'release.shorturl',
}

// NODES

export type HeadingType = Core.HeadingType;
export const HeadingType = Core.HeadingType;

// Inline Nodes

export type Text = Stylable<Core.Text>;

export type LinkNode = Core.LinkNode<Text>;
export const LinkNode = Core.LinkNode;

export type PlaceholderNode = Core.PlaceholderNode<PlaceholderType>;
export const PlaceholderNode = Core.PlaceholderNode;

// Block Nodes

export type AttachmentNode = Core.AttachmentNode;
export const AttachmentNode = Core.AttachmentNode;

export type BookmarkNode = Core.BookmarkNode;
export const BookmarkNode = Core.BookmarkNode;

export type CoverageNode = Core.CoverageNode;
export const CoverageNode = Core.CoverageNode;

export type DividerNode = Core.DividerNode;
export const DividerNode = Core.DividerNode;

export type EmbedNode = Core.EmbedNode;
export const EmbedNode = Core.EmbedNode;

export type HeadingNode = Core.HeadingNode<HeadingType, InlineNode>;
export const HeadingNode = Core.HeadingNode;

export type ImageNode = Alignable<Core.ImageNode>;
export const ImageNode = Core.ImageNode;

export type ParagraphNode = OptionallyAlignable<Core.ParagraphNode<InlineNode>>;
export const ParagraphNode = Core.ParagraphNode;

export type QuoteNode = OptionallyAlignable<Core.QuoteNode<InlineNode>>;
export const QuoteNode = Core.QuoteNode;

export type StoryBookmarkNode = Core.StoryBookmarkNode;
export const StoryBookmarkNode = Core.StoryBookmarkNode;

export type VideoNode = Core.VideoNode;
export const VideoNode = Core.VideoNode;

export type ListNode = Alignable<RecursiveListNode>;
export const ListNode = Core.ListNode;

export type ListItemNode = Core.ListItemNode<ListItemTextNode | RecursiveListNode>;
export const ListItemNode = Core.ListItemNode;

export type ListItemTextNode = Core.ListItemTextNode<InlineNode>;
export const ListItemTextNode = Core.ListItemTextNode;

type RecursiveListNode = Core.ListNode<ListItemTextNode | RecursiveListNode>;
