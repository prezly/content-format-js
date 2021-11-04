import type { Element } from './Element';

export const HeadingNode = {
    HEADING_ONE_TYPE: 'heading-one',
    HEADING_TWO_TYPE: 'heading-two',
};

export interface HeadingNode<Child>
    extends Element<typeof HeadingNode.HEADING_ONE_TYPE | typeof HeadingNode.HEADING_TWO_TYPE> {
    children: Child[];
}
