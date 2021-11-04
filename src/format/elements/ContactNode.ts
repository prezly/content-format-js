import type { Element } from '../Element';

export const ContactNode = {
    TYPE: 'contact',
};

export interface ContactNode extends Element<typeof ContactNode.TYPE> {
    uuid: string;
    contact: { uuid: string };
}
