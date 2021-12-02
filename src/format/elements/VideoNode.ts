import type { Element } from '../Element';
import type { OEmbedInfo } from '../common';

export const VideoNode = {
    TYPE: 'video',
};

export interface VideoNode extends Element<typeof VideoNode.TYPE> {
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
}
