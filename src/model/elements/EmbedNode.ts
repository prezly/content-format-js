import { type OEmbedInfo, isOEmbedInfo } from '../common';
import { type Element, isElement } from '../Element';
import { isNonEmptyString, isUuid } from '../validation';

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
