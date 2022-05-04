import { type Document, type ParagraphNode, type MentionNode, type Text } from './format';

type Inline = MentionNode | Text;

type Block = ParagraphNode<Inline>;

export type NoteContent = Document<Block>;
