import type { ElementNode } from './ElementNode';

export interface CoverageNode extends ElementNode {
    type: 'coverage';
    uuid: string;
    coverage: { id: number };
}
