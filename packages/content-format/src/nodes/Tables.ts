import { ComposedElement } from '../ComposedElement';
import { Node } from '../Node';

export interface TableNode<Child extends Node> extends ComposedElement<typeof TableNode.TYPE, Child> {
    colSizes?: number[];
    header?: TableNode.TableHeader[];
}

export namespace TableNode {
    export const TYPE = 'table';

    export enum TableHeader {
        FIRST_ROW = 'first_row',
        FIRST_COLUMN = 'first_column',
    }

    export function isTableNode<T extends TableNode<Child>, Child extends Node>(value: Node): value is T {
        return ComposedElement.isComposedElement(value, TYPE);
    }

    export function validateTableNode<Table extends TableNode<Child>, Child extends Node>(
        value: Node,
        validateChildNode: (value: Node) => Child | null,
    ): Table | null {
        const isValid = ComposedElement.validateComposedElement(value, TYPE, validateChildNode);
        return isValid ? (value as any) : null;
    }
}

export interface TableRowNode<Child extends Node> extends ComposedElement<typeof TableRowNode.TYPE, Child> {}

export namespace TableRowNode {
    export const TYPE = 'table-row';

    export function isTableRowNode<T extends TableRowNode<Child>, Child extends Node>(value: Node): value is T {
        return ComposedElement.isComposedElement(value, TYPE);
    }

    export function validateTableRowNode<Row extends TableRowNode<Child>, Child extends Node>(
        value: Node,
        validateChildNode: (value: Node) => Child | null,
    ): Row | null {
        const isValid = ComposedElement.validateComposedElement(value, TYPE, validateChildNode);
        return isValid ? (value as any) : null;
    }
}

export interface TableCellNode<Child extends Node> extends ComposedElement<typeof TableCellNode.TYPE, Child> {
    colSpan?: number;
    rowSpan?: number;
    /** @deprecated */
    rowspan?: number;
    /** @deprecated */
    colspan?: number;
}

export namespace TableCellNode {
    export const TYPE = 'table-cell';

    export function isTableCellNode<T extends TableCellNode<Child>, Child extends Node>(value: Node): value is T {
        return ComposedElement.isComposedElement(value, TYPE);
    }

    export function validateTableCellNode<Cell extends TableCellNode<Child>, Child extends Node>(
        value: Node,
        validateChildNode: (value: Node) => Child | null,
    ): Cell | null {
        const isValid = ComposedElement.validateComposedElement(value, TYPE, validateChildNode);
        return isValid ? (value as any) : null;
    }
}
