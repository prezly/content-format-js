import type { Element } from '../Element';
import { isElement } from '../Element';
import { isNonZeroInteger, isObject, isUuid } from '../validation';

export const CoverageNode = {
    TYPE: 'coverage',
};

export interface CoverageNode extends Element<typeof CoverageNode.TYPE> {
    uuid: string;
    coverage: { id: number };
}

export function isCoverageNode(value: any): value is CoverageNode {
    return isElement(value, CoverageNode.TYPE);
}

export function validateCoverageNode(value: any): CoverageNode | null {
    const isValid =
        isCoverageNode(value) &&
        isUuid(value.uuid) &&
        isObject(value.coverage) &&
        isNonZeroInteger(value.coverage.id);

    return isValid ? value : null;
}
