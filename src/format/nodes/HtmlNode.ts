import type { ElementNode } from './ElementNode';

export interface HtmlNode extends ElementNode {
    type: 'html';
    content: string;
}
