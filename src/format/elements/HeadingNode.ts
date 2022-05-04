import { type ComposedElement } from '../ComposedElement';
import { type Node } from '../Node';

export enum HeadingType {
    HEADING_ONE = 'heading-one',
    HEADING_TWO = 'heading-two',
}

export const HeadingNode = {
    HEADING_ONE_TYPE: HeadingType.HEADING_ONE,
    HEADING_TWO_TYPE: HeadingType.HEADING_TWO,
};

export interface HeadingNode<Inline extends Node> extends ComposedElement<HeadingType> {
    children: Inline[];
}
