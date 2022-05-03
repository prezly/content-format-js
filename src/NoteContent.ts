import type { Document, ParagraphNode, MentionNode, Text } from './format';
import {validateDocument, validateMentionNode, validateParagraphNode, validateText} from "./format";

type Inline = MentionNode | Text;

type Block = ParagraphNode<Inline>;

export type NoteContent = Document<Block>;

export function validateNoteContent(value: any): NoteContent | null {
    return validateDocument(value, validateBlockNode);
}

function validateBlockNode(node: any): Block | null {
    return validateParagraphNode(node, validateInlineNode);
}

function validateInlineNode(node: any): Inline | null {
    return validateText(node) ?? validateMentionNode(node);
}
