import { OEmbedInfo as OEmbed } from '../common';
import { Element } from '../Element';
import { isEnum, isNonEmptyString, isUuid } from '../validation';

export interface VideoNode extends Element<typeof VideoNode.TYPE> {
    uuid: string;
    url: string;
    oembed: VideoNode.OEmbedInfo;
    layout: `${VideoNode.Layout}`;
}

export namespace VideoNode {
    export const TYPE = 'video';

    export enum Layout {
        CONTAINED = 'contained',
        EXPANDED = 'expanded',
        FULL_WIDTH = 'full-width',
    }

    export import OEmbedInfo = OEmbed;

    export function isVideoNode(value: any): value is VideoNode {
        return Element.isElement(value, VideoNode.TYPE);
    }

    export function validateVideoNode(value: any): VideoNode | null {
        const isValid =
            isVideoNode(value) &&
            isNonEmptyString(value.url) &&
            isUuid(value.uuid) &&
            OEmbed.isOEmbedInfo(value.oembed) &&
            isEnum(value.layout, Layout);

        return isValid ? value : null;
    }
}
