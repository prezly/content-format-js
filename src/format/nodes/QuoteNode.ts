import type { ElementNode } from './ElementNode';

export interface QuoteNode<Child> extends ElementNode {
    type: 'block-quote';
    children: Child[];
}
