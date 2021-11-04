import type { Element } from './Element';

export const PlaceholderNode = {
    TYPE: 'placeholder',
};

export interface PlaceholderNode<Key extends string> extends Element<typeof PlaceholderNode.TYPE> {
    key: Key;
}
