import { type OEmbedInfo, isOEmbedInfo } from '../common';
import { type Element, isElement } from '../Element';
import { isBoolean, isEnum, isNonEmptyString, isUuid } from '../validation';

export const BookmarkNode = {
    TYPE: 'bookmark',
};

export enum BookmarkCardLayout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export interface BookmarkNode extends Element<typeof BookmarkNode.TYPE> {
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
    layout: BookmarkCardLayout;
    show_thumbnail: boolean;
    new_tab: boolean;
}

export function isBookmarkNode(value: any): value is BookmarkNode {
    return isElement(value, BookmarkNode.TYPE);
}

export function validateBookmarkNode(value: any): BookmarkNode | null {
    const isValid =
        isBookmarkNode(value) &&
        isNonEmptyString(value.url) &&
        isUuid(value.uuid) &&
        isOEmbedInfo(value.oembed) &&
        isEnum(value.layout, BookmarkCardLayout) &&
        isBoolean(value.show_thumbnail) &&
        isBoolean(value.new_tab);

    return isValid ? value : null;
}
