import type { Element } from './Element';

export interface QuoteNode<Child> extends Element {
    type: 'block-quote';
    children: Child[];
}
