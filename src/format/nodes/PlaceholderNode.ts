import type { Element } from './Element';

export interface PlaceholderNode<Key extends string> extends Element {
    type: 'placeholder';
    key: Key;
}
