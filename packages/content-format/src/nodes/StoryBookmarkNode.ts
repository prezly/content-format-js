import { Element } from '../Element';
import { isBoolean, isEnum, isObject, isUuid } from '../validation';

export interface StoryBookmarkNode extends Element<typeof StoryBookmarkNode.TYPE> {
    uuid: string;
    story: {
        uuid: string;
    };
    layout: StoryBookmarkNode.Layout;
    show_thumbnail: boolean;
    new_tab: boolean;
}

export namespace StoryBookmarkNode {
    export const TYPE = 'story-bookmark';

    export enum Layout {
        VERTICAL = 'vertical',
        HORIZONTAL = 'horizontal',
    }

    export function isStoryBookmarkNode(value: any): value is StoryBookmarkNode {
        return Element.isElement(value, StoryBookmarkNode.TYPE);
    }

    export function validateStoryBookmarkNode(value: any): StoryBookmarkNode | null {
        const isValid =
            isStoryBookmarkNode(value) &&
            isUuid(value.uuid) &&
            isObject(value.story) &&
            isUuid(value.story.uuid) &&
            isEnum(value.layout, Layout) &&
            isBoolean(value.show_thumbnail) &&
            isBoolean(value.new_tab);

        return isValid ? value : null;
    }
}
