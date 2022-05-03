import {
    type Document,
    type ParagraphNode,
    type MentionNode,
    type Text,
    validateDocument,
    validateMentionNode,
    validateParagraphNode,
    validateText,
} from './format';

type Inline = MentionNode | Text;

type Block = ParagraphNode<Inline>;

export type NoteContent = Document<Block>;

export const NoteContent = {
    validate(value: any): NoteContent | null {
        return validateDocument<NoteContent, Block>(value, validateBlockNode);
    }
}

function validateBlockNode(node: any): Block | null {
    return validateParagraphNode(node, validateInlineNode);
}

function validateInlineNode(node: any): Inline | null {
    return validateText(node) ?? validateMentionNode(node);
}
