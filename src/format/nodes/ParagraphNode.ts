import type { ElementNode } from './ElementNode';

export interface ParagraphNode<Child> extends ElementNode {
    type: 'paragraph';
    children: Child[];
}
