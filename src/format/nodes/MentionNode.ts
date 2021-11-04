import type { ElementNode } from './ElementNode';

export interface MentionNode extends ElementNode {
    type: 'mention';
    user: { id: number };
}
