import * as Model from './model';
import type { Stylable } from './traits';

// PUBLIC

export function validate(value: any): Document | null {
    return Model.validateDocument(value, validateBlockNode);
}

// Core
export type Document = Model.Document<BlockNode>;
export type InlineNode = MentionNode | Text;
export type BlockNode = ParagraphNode;

// Inlines
export type Text = Stylable<Model.Text>;
export type MentionNode = Model.MentionNode;

// Blocks
export type ParagraphNode = Model.ParagraphNode<InlineNode>;

// PRIVATE

function validateBlockNode(node: any): BlockNode | null {
    return Model.validateParagraphNode(node, validateInlineNode);
}

function validateInlineNode(node: any): InlineNode | null {
    return Model.validateText(node) ?? Model.validateMentionNode(node);
}
