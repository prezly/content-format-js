import { type Element, isElement } from '../Element';

export const HtmlNode = {
    TYPE: 'html',
};

export interface HtmlNode extends Element<typeof HtmlNode.TYPE> {
    content: string;
}

export function isHtmlNode(value: any): value is HtmlNode {
    return isElement(value, HtmlNode.TYPE);
}

export function validateHtmlNode(value: any): HtmlNode | null {
    const isValid = isHtmlNode(value) && typeof value.content === 'string';

    return isValid ? value : null;
}
