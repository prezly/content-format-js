import { Element, isElement } from './Element';
import { isText, Text } from './Text';

export type Node = Element | Text;

export function isNode(value: any): value is Node {
    return isText(value) || isElement(value);
}
