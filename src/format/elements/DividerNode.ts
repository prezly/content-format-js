import { type Element, isElement } from '../Element';

export const DividerNode = {
    TYPE: 'divider',
};

export type DividerNode = Element<typeof DividerNode.TYPE>;

export function isDividerNode(value: any): value is DividerNode {
    return isElement(value, DividerNode.TYPE);
}

export function validateDividerNode(value: any): DividerNode | null {
    return isDividerNode(value) ? value : null;
}
