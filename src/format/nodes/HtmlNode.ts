import type { Element } from './Element';

export const HtmlNode = {
    TYPE: 'html',
};

export interface HtmlNode extends Element<typeof HtmlNode.TYPE> {
    content: string;
}
