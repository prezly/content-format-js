import type { Element } from './Element';

export const Document = {
    TYPE: 'document',
};

export interface Document<Block extends Element> {
    type: typeof Document.TYPE;
    version: string;
    children: Block[];
}
