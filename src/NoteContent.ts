import type { Document, MentionNode, ParagraphNode, Text } from './format';

type Inline = MentionNode | Text;

type Block = ParagraphNode<Inline>;

export type NoteContent = Document<Block>;
