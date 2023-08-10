import { Element } from '../Element';
import { isBoolean, isEnum, isString, isUuid } from '../validation';

export interface ButtonBlockNode extends Element<typeof ButtonBlockNode.TYPE> {
    uuid: string;
    href: string;
    label: string;
    layout: `${ButtonBlockNode.Layout}`;
    variant: `${ButtonBlockNode.Variant}`;
    show_thumbnail: boolean;
    new_tab: boolean;
}

export namespace ButtonBlockNode {
    export const TYPE = 'button-block';

    export enum Layout {
        LEFT = 'left',
        CENTER = 'center',
        RIGHT = 'right',
        WIDE = 'wide',
    }
    export enum Variant {
        DEFAULT = 'default',
        OUTLINE = 'outline',
    }

    export function isButtonBlockNode(value: any): value is ButtonBlockNode {
        return Element.isElement(value, TYPE);
    }

    export function validateButtonBlockNode(value: any): ButtonBlockNode | null {
        const isValid =
            isButtonBlockNode(value) &&
            isString(value.href) &&
            isString(value.label) &&
            isUuid(value.uuid) &&
            isEnum(value.layout, Layout) &&
            isEnum(value.variant, Variant) &&
            isBoolean(value.new_tab);

        return isValid ? value : null;
    }
}
