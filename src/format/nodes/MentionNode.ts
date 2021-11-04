import type { Element } from './Element';

export interface MentionNode extends Element {
    type: 'mention';
    user: { id: number };
}
