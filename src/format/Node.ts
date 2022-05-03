import { type Element, isElement } from './Element';
import { type Text, isText } from './Text';

export type Node = Element | Text;

export function isNode(value: any): value is Node {
    return isText(value) || isElement(value);
}
