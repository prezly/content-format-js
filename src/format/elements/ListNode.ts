import { ComposedElement, isComposedElement } from '../ComposedElement';
import { Node } from '../Node';
import { isArrayOf } from '../validation';

export enum ListType {
    BULLETED = 'bulleted-list',
    NUMBERED = 'numbered-list',
}

export const ListNode = {
    BULLETED_LIST_TYPE: ListType.BULLETED,
    NUMBERED_LIST_TYPE: ListType.NUMBERED,
};

export const ListItemNode = {
    TYPE: 'list-item',
};

export const ListItemTextNode = {
    TYPE: 'list-item-text',
};

export type ListNode<Block extends Node, Type extends ListType = ListType> = ComposedElement<
    Type,
    ListItemNode<Block>
>;

export type ListItemNode<Block extends Node> = ComposedElement<typeof ListItemNode.TYPE, Block>;

export type ListItemTextNode<Inline extends Node> = ComposedElement<
    typeof ListItemTextNode.TYPE,
    Inline
>;

export function isListNode<List extends ListNode<Block>, Block extends Node>(
    value: any,
): value is List;

export function isListNode<
    List extends ListNode<Block, Type>,
    Block extends Node,
    Type extends ListType,
>(value: any, type: Type): value is List;

export function isListNode(value: any, type?: ListType): boolean {
    return type === undefined ? isComposedElement(value) : isComposedElement(value, type);
}

export function isListItemNode<ListItem extends ListItemNode<Block>, Block extends Node>(
    value: any,
): value is ListItem {
    return isComposedElement(value, ListItemNode.TYPE);
}

export function isListItemTextNode<
    ListItemText extends ListItemTextNode<Inline>,
    Inline extends Node,
>(value: any): value is ListItemText {
    return isComposedElement(value, ListItemTextNode.TYPE);
}

export function validateListNode<
    List extends ListNode<Block, Type>,
    Block extends Node,
    Type extends ListType,
>(value: any, type: Type, validateBlockNode: (node: any) => Block | null): List | null;

export function validateListNode<List extends ListNode<Block>, Block extends Node>(
    value: any,
    validateBlockNode: (node: any) => Block | null,
): List | null;

export function validateListNode(value: any, ...params: [Function] | [ListType, Function]) {
    if (params.length === 1) {
        const [validateBlockNode] = params;
        const isValid =
            isListNode(value) &&
            isArrayOf(value.children, (node) => Boolean(validateBlockNode(node)));

        return isValid ? value : null;
    }

    const [type, validateBlockNode] = params;
    const isValid =
        isListNode(value, type) &&
        isArrayOf(value.children, (node) =>
            Boolean(validateListItemNode(node, validateBlockNode as (node: any) => Node | null)),
        );

    return isValid ? value : null;
}

export function validateListItemNode<ListItem extends ListItemNode<Block>, Block extends Node>(
    value: any,
    validateChildNode: (node: any) => Block | null,
): ListItem | null {
    const isValid =
        isListItemNode<ListItem, Block>(value) &&
        isArrayOf(value.children, (node) => Boolean(validateChildNode(node)));

    return isValid ? value : null;
}

export function validateListItemTextNode<
    ListItemText extends ListItemTextNode<Inline>,
    Inline extends Node,
>(value: any, validateChildNode: (node: any) => Inline | null): ListItemText | null {
    const isValid =
        isListItemTextNode<ListItemText, Inline>(value) &&
        isArrayOf(value.children, (node) => Boolean(validateChildNode(node)));

    return isValid ? value : null;
}
