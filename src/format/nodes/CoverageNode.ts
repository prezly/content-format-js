import type { Element } from './Element';

export interface CoverageNode extends Element {
    type: 'coverage';
    uuid: string;
    coverage: { id: number };
}
