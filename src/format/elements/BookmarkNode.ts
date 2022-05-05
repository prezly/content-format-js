import type { OEmbedInfo } from '../common';
import type { Element } from '../Element';
import type { Card } from '../../traits';

export const BookmarkNode = {
    TYPE: 'bookmark',
};

export interface BookmarkNode extends Element<typeof BookmarkNode.TYPE>, Card {
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
}
