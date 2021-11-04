import type { OEmbedInfo } from '../common';
import type { ElementNode } from './ElementNode';

export interface EmbedNode extends ElementNode {
    type: 'embed';
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
}
