import { type Element } from '../Element';

export const CoverageNode = {
    TYPE: 'coverage',
};

export interface CoverageNode extends Element<typeof CoverageNode.TYPE> {
    uuid: string;
    coverage: { id: number };
}
