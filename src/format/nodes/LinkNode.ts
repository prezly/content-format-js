import type { ElementNode } from './ElementNode';

export interface LinkNode<Child> extends ElementNode {
    type: 'link';
    href: string;
    children: Child[];
}
