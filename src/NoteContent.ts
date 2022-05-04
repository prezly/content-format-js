import type { Document, ParagraphNode, MentionNode, Text } from './format';

type Inline = MentionNode | Text;

type Block = ParagraphNode<Inline>;

export type NoteContent = Document<Block>;
