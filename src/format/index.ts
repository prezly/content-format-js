import { Element, Text } from './nodes';

export * from './common';
export * from './nodes';

export type Node = Element | Text;

export interface Document<Block extends Element> {
    type: 'document';
    version: string;
    children: Block[];
}
