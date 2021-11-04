import { ElementNode, TextNode } from './nodes';

export * from './common';
export * from './nodes';

export type Node = ElementNode | TextNode;

export interface Document<Block extends ElementNode> {
    type: 'document';
    version: string;
    children: Block[];
}
