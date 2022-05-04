import { type Document, type ParagraphNode, type MentionNode, type Text } from './format';

type Inline = MentionNode | Text;

export type NoteContent = Document<ParagraphNode<Inline>>;
