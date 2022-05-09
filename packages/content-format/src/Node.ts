import { Element } from './Element';
import { Text } from './Text';
import type { ComposedElement } from './ComposedElement';

export type Node = ComposedElement | Element | Text;

export namespace Node {
    export function isNode(value: any): value is Node {
        return Text.isText(value) || Element.isElement(value);
    }
}
