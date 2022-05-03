import type { Element } from '../Element';
import type { OEmbedInfo } from '../common';
import { isElement } from '../Element';
import { isNonEmptyString, isUuid } from '../validation';
import { isOEmbedInfo } from '../common';

export const VideoNode = {
    TYPE: 'video',
};

export interface VideoNode extends Element<typeof VideoNode.TYPE> {
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
}

export function isVideoNode(value: any): value is VideoNode {
    return isElement(value, VideoNode.TYPE);
}

export function validateVideoNode(value: any): VideoNode | null {
    const isValid =
        isVideoNode(value) &&
        isNonEmptyString(value.url) &&
        isUuid(value.uuid) &&
        isOEmbedInfo(value.oembed);

    return isValid ? value : null;
}
