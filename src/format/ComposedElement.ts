import { type Element } from './Element';
import { type Node } from './Node';

export interface ComposedElement<Type extends string = string> extends Element<Type> {
    children: Node[];
}
