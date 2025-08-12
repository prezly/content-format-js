import { Element } from '../Element';
import { isEnum, isObject, isUuid } from '../validation';

export interface StoryEmbedNode extends Element<typeof StoryEmbedNode.TYPE> {
    story: {
        uuid: string;
    };
    appearance: `${StoryEmbedNode.Appearance}`;
    position: `${StoryEmbedNode.Position}`;
    header_footer: `${StoryEmbedNode.HeaderFooter}`;
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

    export enum HeaderFooter {
        NONE = 'none',
        STANDARD = 'standard',
        FULL = 'full',
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
            isEnum(node.position, Position) &&
            isEnum(node.header_footer, HeaderFooter);

        return isValid ? node : null;
    }
}
