import type { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';

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

export interface ListNode<Block extends Node> extends ComposedElement<ListType> {
    children: ListItemNode<Block>[];
}

export interface ListItemNode<Block extends Node>
    extends ComposedElement<typeof ListItemNode.TYPE> {
    children: Block[];
}

export interface ListItemTextNode<Inline extends Node>
    extends ComposedElement<typeof ListItemTextNode.TYPE> {
    children: Inline[];
}
