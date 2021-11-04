import type { Element } from './Element';

export interface LinkNode<Child> extends Element {
    type: 'link';
    href: string;
    children: Child[];
}
