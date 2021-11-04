import type { OEmbedInfo } from '../common';
import type { Element } from './Element';

export interface EmbedNode extends Element {
    type: 'embed';
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
}
