import type { Element } from './Element';

export const QuoteNode = {
    TYPE: 'block-quote',
};

export interface QuoteNode<Child> extends Element<typeof QuoteNode.TYPE> {
    children: Child[];
}
