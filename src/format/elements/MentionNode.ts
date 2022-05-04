import { type Element } from '../Element';

export const MentionNode = {
    TYPE: 'mention',
};

export interface MentionNode extends Element<typeof MentionNode.TYPE> {
    user: { id: number };
}
