import type { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';
import { isElement } from '../Element';
import { isArrayOf } from '../validation';

export enum HeadingType {
    HEADING_ONE = 'heading-one',
    HEADING_TWO = 'heading-two',
}

export const HeadingNode = {
    HEADING_ONE_TYPE: HeadingType.HEADING_ONE,
    HEADING_TWO_TYPE: HeadingType.HEADING_TWO,
};

export interface HeadingNode<Type extends HeadingType, Child extends Node> extends ComposedElement<HeadingType> {
    type: Type;
    children: Child[];
}

export function isHeadingNode<Heading extends HeadingNode<HeadingType, Child>, Child extends Node>(
    value: any,
): value is Heading;

export function isHeadingNode<Heading extends HeadingNode<Type, Child>, Type extends HeadingType, Child extends Node>(
    value: any,
    type: Type,
): value is Heading;

export function isHeadingNode(value: any, type?: HeadingType) {
    return isElement(value) && (type === undefined || value.type === type);
}

export function validateHeadingNode<Heading extends HeadingNode<HeadingType, Child>, Child extends Node>(
    value: any,
    validateChildNode: (node: any) => Child | null,
): Heading | null;

export function validateHeadingNode<
    Heading extends HeadingNode<Type, Child>,
    Type extends HeadingType,
    Child extends Node,
>(value: any, type: Type, validateChildNode: (node: any) => Child | null): Heading | null;

export function validateHeadingNode(value: any, ...params: [Function] | [HeadingType, Function]) {
    if (params.length === 2) {
        const [type, validateChildNode] = params;
        const isValid =
            isHeadingNode(value, type) && isArrayOf(value.children, (node) => Boolean(validateChildNode(node)));

        return isValid ? value : null;
    }

    const [validateChildNode] = params;
    const isValid = isHeadingNode(value) && isArrayOf(value.children, (node) => Boolean(validateChildNode(node)));

    return isValid ? value : null;
}
