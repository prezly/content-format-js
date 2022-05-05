import * as Core from './model';
import type { Stylable } from './traits';

// TYPES

// Core
export type Document = Core.Document<BlockNode>;
export const Document = Core.Document;

export type Node = InlineNode | BlockNode;
export type ComposedElement = ParagraphNode;
export type InlineNode = MentionNode | Text;
export type BlockNode = ParagraphNode;

// Inlines
export type Text = Stylable<Core.Text>;

export type MentionNode = Core.MentionNode;
export const MentionNode = Core.MentionNode;

// Blocks
export type ParagraphNode = Core.ParagraphNode<InlineNode>;
export const ParagraphNode = Core.ParagraphNode;

// PUBLIC

export const validate = (value: any): Document | null => Core.validateDocument(value, validateBlockNode);

export const isDocument = (value: any): value is Document => Core.isDocument(value);
export const isNode = (value: any): value is Node => Core.isNode(value);
export const isComposedElement = (value: any): value is ComposedElement => Core.isComposedElement(value);

// Inlines
export const isText = (value: any): value is Text => Core.isText(value);
export const isMentionNode = (value: any): value is MentionNode => Core.isMentionNode(value);
// BLocks
export const isParagraphNode = (value: any): value is ParagraphNode => Core.isParagraphNode(value);
// Groups
export const isInlineNode = (value: any): value is InlineNode => isText(value) || isMentionNode(value);
export const isBlockNode = (value: any): value is BlockNode => isParagraphNode(value);

// PRIVATE

function validateBlockNode(node: any): BlockNode | null {
    return Core.validateParagraphNode(node, validateInlineNode);
}

function validateInlineNode(node: any): InlineNode | null {
    return Core.validateText(node) ?? Core.validateMentionNode(node);
}
