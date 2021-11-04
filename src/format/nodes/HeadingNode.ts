import type { Element } from './Element';

export interface HeadingNode<Child> extends Element {
    type: 'heading-one' | 'heading-two';
    children: Child[];
}
