import * as Core from '@prezly/content-format';
import type { Stylable } from '@prezly/content-format';

// CORE

export type DocumentNode = Core.DocumentNode<BlockNode>;
export const DocumentNode = Core.DocumentNode;

export type Node = InlineNode | BlockNode;
export type ComposedElement = ParagraphNode;
export type InlineNode = MentionNode | Text;
export type BlockNode = ParagraphNode;

// NODES

// Inline nodes
export type Text = Stylable<Core.Text>;

export type MentionNode = Core.MentionNode;
export const MentionNode = Core.MentionNode;

// Block nodes
export type ParagraphNode = Core.ParagraphNode<InlineNode>;
export const ParagraphNode = Core.ParagraphNode;
