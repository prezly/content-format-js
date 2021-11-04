import type { Element } from './Element';

export interface ContactNode extends Element {
    type: 'contact';
    uuid: string;
    contact: { uuid: string };
}
