import { Element } from '../Element';
import { isNonZeroInteger, isObject } from '../validation';

export interface MentionNode extends Element<typeof MentionNode.TYPE> {
    user: { id: number };
}

export namespace MentionNode {
    export const TYPE = 'mention';

    export function isMentionNode(value: any): value is MentionNode {
        return Element.isElement(value, MentionNode.TYPE);
    }

    export function validateMentionNode(value: any): MentionNode | null {
        const isValid = isMentionNode(value) && isObject(value.user) && isNonZeroInteger(value.user.id);

        return isValid ? value : null;
    }
}
