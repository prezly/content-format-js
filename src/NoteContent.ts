import type { Document, ParagraphNode, MentionNode, Text } from './format';

type Inline = MentionNode | Text;

export type NoteContent = Document<ParagraphNode<Inline>>;
