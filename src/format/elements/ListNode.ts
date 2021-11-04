import { ComposedElement } from '../ComposedElement';
import { Node } from '../Node';

export const ListNode = {
    BULLETED_LIST_TYPE: 'bulleted-list',
    NUMBERED_LIST_TYPE: 'numbered-list',
};

export const ListItemNode = {
    TYPE: 'list-item',
};

export const ListItemTextNode = {
    TYPE: 'list-item-text',
};

export interface ListNode<Block extends Node>
    extends ComposedElement<
        typeof ListNode.BULLETED_LIST_TYPE | typeof ListNode.NUMBERED_LIST_TYPE
    > {
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
