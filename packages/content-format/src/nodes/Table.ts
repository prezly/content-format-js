import { ComposedElement } from '../ComposedElement';
import { Element } from '../Element';
import { Node } from '../Node';

export interface TableNode extends Element<typeof TableNode.TYPE> {
    children: TableRowNode[];
    border?: boolean;
    header?: TableNode.TableHeader[];
}

export namespace TableNode {
    export const TYPE = 'table';

    export enum TableHeader {
        FIRST_ROW = 'first_row',
        FIRST_COLUMN = 'first_column',
    }

    export function isTableNode(value: Node): value is TableNode {
        return Element.isElement(value, TYPE);
    }

    export function validateTableNode(value: Node): TableNode | null {
        const isValid = isTableNode(value);
        return isValid ? value : null;
    }
}

export interface TableRowNode extends Element<typeof TableRowNode.TYPE> {
    children: TableCellNode[];
}

export namespace TableRowNode {
    export const TYPE = 'table-row';

    export function isTableRowNode(value: Node): value is TableRowNode {
        return Element.isElement(value, TYPE);
    }

    export function validateTableRowNode(value: Node): TableRowNode | null {
        const isValid = isTableRowNode(value);
        return isValid ? value : null;
    }
}

export interface TableCellNode extends ComposedElement<typeof TableCellNode.TYPE> {
    rowspan?: number;
    colspan?: number;
}

export namespace TableCellNode {
    export const TYPE = 'table-cell';

    export function isTableCellNode(value: Node): value is TableCellNode {
        return Element.isElement(value, TYPE);
    }

    export function validateTableCellNode(value: Node): TableCellNode | null {
        const isValid = isTableCellNode(value);
        return isValid ? value : null;
    }
}
