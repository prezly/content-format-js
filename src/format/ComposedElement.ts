import { Element } from './Element';
import { Node } from './Node';

export interface ComposedElement<Type extends string = string> extends Element<Type> {
    children: Node[];
}
