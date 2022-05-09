import { Element } from '../Element';
import { isObject, isUuid } from '../validation';

export interface ContactNode extends Element<typeof ContactNode.TYPE> {
    uuid: string;
    contact: ContactNode.ContactInfo;
}

export namespace ContactNode {
    export const TYPE = 'contact';

    export interface ContactInfo {
        id: number;
        uuid: string;
        name: string;
        email: string | null;
        phone: string | null;
        mobile: string | null;
        company: string | null;
        description: string | null;
        website: string | null;
        twitter: string | null;
        facebook: string | null;
        avatar_url: string | null;
    }

    export function isContactNode(value: any): value is ContactNode {
        return Element.isElement(value, TYPE);
    }

    export function validateContactNode(value: any): ContactNode | null {
        const isValid =
            isContactNode(value) && isUuid(value.uuid) && isObject(value.contact) && isUuid(value.contact.uuid);

        return isValid ? value : null;
    }
}
