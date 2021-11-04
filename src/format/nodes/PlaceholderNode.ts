import type { ElementNode } from './ElementNode';

export interface PlaceholderNode<Key extends string> extends ElementNode {
    type: 'placeholder';
    key: Key;
}
