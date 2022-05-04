import { type Document, type MentionNode, type ParagraphNode, type Text } from './format';

type Inline = MentionNode | Text;

type Block = ParagraphNode<Inline>;

export type NoteContent = Document<Block>;
