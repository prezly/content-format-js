import { type Card, CardLayout } from '../../traits';
import { type Element, isElement } from '../Element';
import { isBoolean, isEnum, isObject, isUuid } from '../validation';

export const StoryBookmarkNode = {
    TYPE: 'story-bookmark',
};

export interface StoryBookmarkNode extends Element<typeof StoryBookmarkNode.TYPE>, Card {
    uuid: string;
    story: {
        uuid: string;
    };
}

export function isStoryBookmarkNode(value: any): value is StoryBookmarkNode {
    return isElement(value, StoryBookmarkNode.TYPE);
}

export function validateStoryBookmarkNode(value: any): StoryBookmarkNode | null {
    const isValid =
        isStoryBookmarkNode(value) &&
        isUuid(value.uuid) &&
        isObject(value.story) &&
        isUuid(value.story.uuid) &&
        isEnum(value.layout, CardLayout) &&
        isBoolean(value.show_thumbnail) &&
        isBoolean(value.new_tab);

    return isValid ? value : null;
}
