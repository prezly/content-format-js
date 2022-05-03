import type { OEmbedInfo } from '../common';
import type { Element } from '../Element';
import { isElement } from '../Element';
import { isNonEmptyString, isUuid } from '../validation';
import { isOEmbedInfo } from '../common';

export const EmbedNode = {
    TYPE: 'embed',
};

export interface EmbedNode extends Element<typeof EmbedNode.TYPE> {
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
}

export function isEmbedNode(value: any): value is EmbedNode {
    return isElement(value, EmbedNode.TYPE);
}

export function validateEmbedNode(value: any): EmbedNode | null {
    const isValid =
        isEmbedNode(value) &&
        isNonEmptyString(value.url) &&
        isUuid(value.uuid) &&
        isOEmbedInfo(value.oembed);

    return isValid ? value : null;
}
