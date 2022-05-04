import { type Element, isElement } from './Element';
import { type Text, isText } from './Text';
import type { ComposedElement } from './ComposedElement';

export type Node = ComposedElement | Element | Text;

export function isNode(value: any): value is Node {
    return isText(value) || isElement(value);
}
