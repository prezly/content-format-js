import type { OEmbedInfo } from '../common';
import type { Element } from '../Element';

export const BookmarkNode = {
    TYPE: 'bookmark',
};

export enum BookmarkCardLayout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export interface BookmarkNode extends Element<typeof BookmarkNode.TYPE> {
    uuid: string;
    href: string;
    oembed: OEmbedInfo;
    layout: BookmarkCardLayout;
    show_thumbnail: boolean;
    new_tab: boolean;
}
