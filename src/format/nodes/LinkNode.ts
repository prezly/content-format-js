import type { Element } from './Element';

export const LinkNode = {
    TYPE: 'link',
};

export interface LinkNode<Child> extends Element<typeof LinkNode.TYPE> {
    href: string;
    children: Child[];
}
