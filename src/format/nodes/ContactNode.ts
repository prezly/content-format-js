import type { ElementNode } from './ElementNode';

export interface ContactNode extends ElementNode {
    type: 'contact';
    uuid: string;
    contact: { uuid: string };
}
