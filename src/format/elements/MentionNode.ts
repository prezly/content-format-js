import { type Element, isElement } from '../Element';
import { isNonZeroInteger, isObject} from '../validation';

export const MentionNode = {
    TYPE: 'mention',
};

export interface MentionNode extends Element<typeof MentionNode.TYPE> {
    user: { id: number };
}

export function isMentionNode(value: any): value is MentionNode {
    return isElement(value, MentionNode.TYPE);
}

export function validateMentionNode(value: any): MentionNode | null {
    const isValid = isMentionNode(value) && isObject(value.user) && isNonZeroInteger(value.user.id);

    return isValid ? value : null;
}
