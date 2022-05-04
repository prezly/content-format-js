import type * as Model from './model';
import {
    validateDocument,
    validateMentionNode,
    validateParagraphNode,
    validateText,
} from './model';
import type { Stylable } from './traits';

// PUBLIC

export function validate(value: any): Document | null {
    return validateDocument(value, validateBlockNode);
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
    return validateParagraphNode(node, validateInlineNode);
}

function validateInlineNode(node: any): InlineNode | null {
    return validateText(node) ?? validateMentionNode(node);
}
