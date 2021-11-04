import { Document, ParagraphNode, MentionNode, TextNode } from './format';

type Inline = MentionNode | TextNode;

export type NoteContent = Document<ParagraphNode<Inline>>;
