import { type Element, isElement } from '../Element';
import { isObject, isUuid } from '../validation';

export const ContactNode = {
    TYPE: 'contact',
};

export interface ContactNode extends Element<typeof ContactNode.TYPE> {
    uuid: string;
    contact: { uuid: string };
}

export function isContactNode(value: any): value is ContactNode {
    return isElement(value, ContactNode.TYPE);
}

export function validateContactNode(value: any): ContactNode | null {
    const isValid =
        isContactNode(value) &&
        isUuid(value.uuid) &&
        isObject(value.contact) &&
        isUuid(value.contact.uuid);

    return isValid ? value : null;
}
