import { Element } from '../Element';
import { isObject, isUuid } from '../validation';

export interface ContactNode extends Element<typeof ContactNode.TYPE> {
    uuid: string;
    contact: { uuid: string };
}

export namespace ContactNode  {
    export const TYPE = 'contact';

    export function isContactNode(value: any): value is ContactNode {
        return Element.isElement(value, TYPE);
    }

    export function validateContactNode(value: any): ContactNode | null {
        const isValid = isContactNode(value) && isUuid(value.uuid) && isObject(value.contact) && isUuid(value.contact.uuid);

        return isValid ? value : null;
    }
}
