import { OEmbedInfo as OEmbed } from '../common';
import { Element } from '../Element';
import { isNonEmptyString, isUuid } from '../validation';

export interface VideoNode extends Element<typeof VideoNode.TYPE> {
    uuid: string;
    url: string;
    oembed: VideoNode.OEmbedInfo;
}

export namespace VideoNode {
    export const TYPE = 'video';

    export import OEmbedInfo = OEmbed;

    export function isVideoNode(value: any): value is VideoNode {
        return Element.isElement(value, VideoNode.TYPE);
    }

    export function validateVideoNode(value: any): VideoNode | null {
        const isValid =
            isVideoNode(value) &&
            isNonEmptyString(value.url) &&
            isUuid(value.uuid) &&
            OEmbed.isOEmbedInfo(value.oembed);

        return isValid ? value : null;
    }
}
