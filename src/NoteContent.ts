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

export function validate(value: any): Document | null {
    return Core.validateDocument(value, validateBlockNode);
}

// PRIVATE

function validateBlockNode(node: any): BlockNode | null {
    return Core.validateParagraphNode(node, validateInlineNode);
}

function validateInlineNode(node: any): InlineNode | null {
    return Core.validateText(node) ?? Core.validateMentionNode(node);
}
