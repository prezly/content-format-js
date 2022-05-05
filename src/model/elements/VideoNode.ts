import { type OEmbedInfo, isOEmbedInfo } from '../common';
import { type Element, isElement } from '../Element';
import { isNonEmptyString, isUuid } from '../validation';

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
        isVideoNode(value) && isNonEmptyString(value.url) && isUuid(value.uuid) && isOEmbedInfo(value.oembed);

    return isValid ? value : null;
}
