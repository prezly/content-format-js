import { Element } from '../Element';

export interface DividerNode extends Element<typeof DividerNode.TYPE> {}

export namespace DividerNode {
    export const TYPE = 'divider';

    export function isDividerNode(value: any): value is DividerNode {
        return Element.isElement(value, TYPE);
    }

    export function validateDividerNode(value: any): DividerNode | null {
        return isDividerNode(value) ? value : null;
    }
}
