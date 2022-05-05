import { type OEmbedInfo, isOEmbedInfo } from '../common';
import { type Element, isElement } from '../Element';
import { type Card, CardLayout } from '../../traits';
import { isBoolean, isEnum, isNonEmptyString, isUuid } from '../validation';

export const BookmarkNode = {
    TYPE: 'bookmark',
};

export interface BookmarkNode extends Element<typeof BookmarkNode.TYPE>, Card {
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
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
        isEnum(value.layout, CardLayout) &&
        isBoolean(value.show_thumbnail) &&
        isBoolean(value.new_tab);

    return isValid ? value : null;
}
