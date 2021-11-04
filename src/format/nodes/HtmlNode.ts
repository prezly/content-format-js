import type { Element } from './Element';

export interface HtmlNode extends Element {
    type: 'html';
    content: string;
}
