import { Element } from '../Element';
import { isNonZeroInteger, isObject, isUuid } from '../validation';

export interface CoverageNode extends Element<typeof CoverageNode.TYPE> {
    uuid: string;
    coverage: { id: number };
}

export namespace CoverageNode {
    export const TYPE = 'coverage';

    export function isCoverageNode(value: any): value is CoverageNode {
        return Element.isElement(value, TYPE);
    }

    export function validateCoverageNode(value: any): CoverageNode | null {
        const isValid =
            isCoverageNode(value) &&
            isUuid(value.uuid) &&
            isObject(value.coverage) &&
            isNonZeroInteger(value.coverage.id);

        return isValid ? value : null;
    }
}
