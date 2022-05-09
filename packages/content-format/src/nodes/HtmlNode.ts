import { Element } from '../Element';

export interface HtmlNode extends Element<typeof HtmlNode.TYPE> {
    content: string;
}

export namespace HtmlNode {
    export const TYPE = 'html';

    export function isHtmlNode(value: any): value is HtmlNode {
        return Element.isElement(value, TYPE);
    }

    export function validateHtmlNode(value: any): HtmlNode | null {
        const isValid = isHtmlNode(value) && typeof value.content === 'string';

        return isValid ? value : null;
    }
}
