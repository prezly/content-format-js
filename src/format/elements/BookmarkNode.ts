import type { OEmbedInfo } from '../common';
import type { Element } from '../Element';

export const BookmarkNode = {
    TYPE: 'bookmark',
};

export enum BookmarkNodeLayout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export interface BookmarkNode extends Element<typeof BookmarkNode.TYPE> {
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
    layout: BookmarkNodeLayout;
    show_preview_image: boolean;
    open_in_new_tab: boolean;
}
