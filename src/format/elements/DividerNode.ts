import { type Element } from '../Element';

export const DividerNode = {
    TYPE: 'divider',
};

export type DividerNode = Element<typeof DividerNode.TYPE>;
