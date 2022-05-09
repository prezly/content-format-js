import { OEmbedInfo as OEmbed } from '../common';
import { Element } from '../Element';
import { isBoolean, isEnum, isNonEmptyString, isUuid } from '../validation';

export interface BookmarkNode extends Element<typeof BookmarkNode.TYPE> {
    uuid: string;
    url: string;
    oembed: BookmarkNode.OEmbedInfo;
    layout: `${BookmarkNode.Layout}`;
    show_thumbnail: boolean;
    new_tab: boolean;
}

export namespace BookmarkNode {
    export const TYPE = 'bookmark';

    export import OEmbedInfo = OEmbed;

    export enum Layout {
        VERTICAL = 'vertical',
        HORIZONTAL = 'horizontal',
    }

    export function isBookmarkNode(value: any): value is BookmarkNode {
        return Element.isElement(value, TYPE);
    }

    export function validateBookmarkNode(value: any): BookmarkNode | null {
        const isValid =
            isBookmarkNode(value) &&
            isNonEmptyString(value.url) &&
            isUuid(value.uuid) &&
            OEmbed.isOEmbedInfo(value.oembed) &&
            isEnum(value.layout, Layout) &&
            isBoolean(value.show_thumbnail) &&
            isBoolean(value.new_tab);

        return isValid ? value : null;
    }
}
