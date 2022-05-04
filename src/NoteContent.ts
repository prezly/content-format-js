import type { Document, MentionNode, ParagraphNode, Text } from './format';
import type { Stylable } from './traits';

type Inline = MentionNode | Stylable<Text>;

type Block = ParagraphNode<Inline>;

export type NoteContent = Document<Block>;
