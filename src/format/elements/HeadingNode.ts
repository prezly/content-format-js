import type { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';

export const HeadingNode = {
    HEADING_ONE_TYPE: 'heading-one',
    HEADING_TWO_TYPE: 'heading-two',
};

export interface HeadingNode<Inline extends Node>
    extends ComposedElement<
        typeof HeadingNode.HEADING_ONE_TYPE | typeof HeadingNode.HEADING_TWO_TYPE
    > {
    children: Inline[];
}
