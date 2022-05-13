import { Element } from '../Element';
import {isBoolean, isEnum, isNonZeroInteger, isObject, isUuid} from '../validation';

export interface CoverageNode extends Element<typeof CoverageNode.TYPE> {
    uuid: string;
    coverage: { id: number };
    layout: CoverageNode.Layout;
    new_tab: boolean;
    show_thumbnail: boolean;
}

export namespace CoverageNode {
    export const TYPE = 'coverage';
    export enum Layout {
        VERTICAL = 'vertical',
        HORIZONTAL = 'horizontal',
    }

    export function isCoverageNode(value: any): value is CoverageNode {
        return Element.isElement(value, TYPE);
    }

    export function validateCoverageNode(value: any): CoverageNode | null {
        const isValid =
            isCoverageNode(value) &&
            isUuid(value.uuid) &&
            isEnum(value.layout, Layout) &&
            isBoolean(value.new_tab) &&
            isBoolean(value.show_thumbnail) &&
            isObject(value.coverage) &&
            isNonZeroInteger(value.coverage.id);

        return isValid ? value : null;
    }
}
