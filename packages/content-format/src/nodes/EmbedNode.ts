import { OEmbedInfo as OEmbed } from '../common';
import { Element } from '../Element';
import { isNonEmptyString, isUuid } from '../validation';

export interface EmbedNode extends Element<typeof EmbedNode.TYPE> {
    uuid: string;
    url: string;
    oembed: OEmbed;
    layout: `${EmbedNode.Layout}`;
}

export namespace EmbedNode {
    export const TYPE = 'embed';

    export enum Layout {
        CONTAINED = 'contained',
        EXPANDED = 'expanded',
        FULL_WIDTH = 'full-width',
    }

    export import OEmbedInfo = OEmbed;

    export function isEmbedNode(value: any): value is EmbedNode {
        return Element.isElement(value, TYPE);
    }

    export function validateEmbedNode(value: any): EmbedNode | null {
        const isValid =
            isEmbedNode(value) &&
            isNonEmptyString(value.url) &&
            isUuid(value.uuid) &&
            OEmbed.isOEmbedInfo(value.oembed);

        return isValid ? value : null;
    }
}
