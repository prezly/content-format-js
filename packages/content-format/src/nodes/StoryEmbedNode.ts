import { Element } from '../Element';
import { isEnum, isObject, isUuid } from '../validation';

export interface StoryEmbedNode extends Element<typeof StoryEmbedNode.TYPE> {
    story: {
        uuid: string;
    };
    appearance: StoryEmbedNode.Appearance;
    position: StoryEmbedNode.Position;
}

export namespace StoryEmbedNode {
    export const TYPE = 'story-embed';

    export enum Appearance {
        INTRO = 'intro',
        FULL = 'full',
    }

    export enum Position {
        CENTER = 'center',
        LEFT = 'left',
        RIGHT = 'right',
    }

    export function isStoryEmbedNode(value: any): value is StoryEmbedNode {
        return Element.isElement(value, TYPE);
    }

    export function validateStoryEmbedNode(node: any): StoryEmbedNode | null {
        const isValid =
            isStoryEmbedNode(node) &&
            isObject(node.story) &&
            isUuid(node.story.uuid) &&
            isEnum(node.appearance, Appearance) &&
            isEnum(node.position, Position);

        return isValid ? node : null;
    }
}
