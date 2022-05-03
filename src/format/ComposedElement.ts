import { type Element, isElement } from './Element';
import { type Node } from './Node';
import { isArrayOf } from './validation';

export interface ComposedElement<Type extends string = string, Child extends Node = Node>
    extends Element<Type> {
    children: Child[];
}

export function isComposedElement(value: any): value is ComposedElement;
export function isComposedElement<
    Composed extends ComposedElement<Type, Child>,
    Type extends string,
    Child extends Node,
>(value: any, type: Type): value is Composed;
export function isComposedElement(value: any, type?: string): boolean {
    if (type === undefined ? isElement(value) : isElement(value, type)) {
        return 'children' in value && Array.isArray(value.children);
    }
    return false;
}

export function validateComposedElement<
    Composed extends ComposedElement<Type, Child>,
    Type extends string,
    Child extends Node,
>(value: any, type: Type, validateChild: (node: any) => Child | null): Composed | null {
    const isValid =
        isComposedElement<Composed, Type, Child>(value, type) &&
        value.type === type &&
        isArrayOf(value.children, (child) => Boolean(validateChild(child)));

    return isValid ? value : null;
}
