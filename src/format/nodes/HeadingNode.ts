import type { ElementNode } from './ElementNode';

export interface HeadingNode<Child> extends ElementNode {
    type: 'heading-one' | 'heading-two';
    children: Child[];
}
