import { Element } from '../Element';
import { isObject, isUuid } from '../validation';

interface NewsroomContact {
    uuid: string;
}

export interface ContactNode extends Element<typeof ContactNode.TYPE> {
    uuid: string;
    reference: NewsroomContact['uuid'] | null;
    contact: ContactNode.ContactInfo;
}

export namespace ContactNode {
    export const TYPE = 'contact';

    export interface ContactInfo {
        avatar_url: string | null;
        name: string;
        company: string;
        description: string;
        email: string;
        website: string;
        phone: string;
        mobile: string;
        twitter: string;
        facebook: string;
    }

    export function isContactNode(value: any): value is ContactNode {
        return Element.isElement(value, TYPE);
    }

    export function validateContactNode(value: any): ContactNode | null {
        const isValid = isContactNode(value) && isUuid(value.uuid) && isObject(value.contact);

        return isValid ? value : null;
    }
}
