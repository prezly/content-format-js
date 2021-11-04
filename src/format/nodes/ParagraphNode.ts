import type { Element } from './Element';

export const ParagraphNode = {
    TYPE: 'paragraph',
};

export interface ParagraphNode<Child> extends Element<typeof ParagraphNode.TYPE> {
    children: Child[];
}
