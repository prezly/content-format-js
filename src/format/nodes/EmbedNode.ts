import type { OEmbedInfo } from '../common';
import type { Element } from './Element';

export const EmbedNode = {
    TYPE: 'embed',
};

export interface EmbedNode extends Element<typeof EmbedNode.TYPE> {
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
}
