import type { Element } from './Element';

export interface ParagraphNode<Child> extends Element {
    type: 'paragraph';
    children: Child[];
}
