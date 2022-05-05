import * as Core from './model';
import type { Stylable } from './traits';

// TYPES

// Core
export type Document = Core.Document<BlockNode>;
export type InlineNode = MentionNode | Text;
export type BlockNode = ParagraphNode;

// Inlines
export type Text = Stylable<Core.Text>;
export type MentionNode = Core.MentionNode;

// Blocks
export type ParagraphNode = Core.ParagraphNode<InlineNode>;

// PUBLIC

export const validate = (value: any): Document | null => Core.validateDocument(value, validateBlockNode);

export const isDocument = (value: any): value is Document => Core.isDocument(value);
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
