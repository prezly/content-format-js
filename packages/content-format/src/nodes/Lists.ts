import { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';

type ValidateFn = (value: any) => Node | null;

export interface ListNode<Block extends Node, Type extends string = ListNode.Type>
    extends ComposedElement<Type, ListItemNode<Block>> {}

export interface ListItemNode<Child extends Node> extends ComposedElement<typeof ListItemNode.TYPE, Child> {}

export interface ListItemTextNode<Inline extends Node> extends ComposedElement<typeof ListItemTextNode.TYPE, Inline> {}

export namespace ListNode {
    export enum Type {
        BULLETED = 'bulleted-list',
        NUMBERED = 'numbered-list',
    }

    export function isListNode<List extends ListNode<Block>, Block extends Node>(value: any): value is List;

    export function isListNode<List extends ListNode<Block, Type>, Block extends Node, Type extends ListNode.Type>(
        value: any,
        type: Type,
    ): value is List;

    export function isListNode(value: any, type?: ListNode.Type): boolean {
        return type === undefined
            ? ComposedElement.isComposedElement(value)
            : ComposedElement.isComposedElement(value, type);
    }

    export function validateListNode<
        List extends ListNode<Block, Type>,
        Block extends Node,
        Type extends ListNode.Type,
    >(value: any, type: Type, validateChildNode: (node: any) => Block | null): List | null;

    export function validateListNode<List extends ListNode<Block>, Block extends Node>(
        value: any,
        validateBlockNode: (node: any) => Block | null,
    ): List | null;

    export function validateListNode(value: any, ...params: [ValidateFn] | [ListNode.Type, ValidateFn]) {
        if (params.length === 1) {
            const [validateBlockNode] = params;
            const isValid =
                isListNode(value) &&
                ComposedElement.validateComposedElement(value, value.type, function (node) {
                    return ListItemNode.validateListItemNode(node, validateBlockNode);
                });
            return isValid ? value : null;
        }

        const [type, validateBlockNode] = params;
        const isValid = ComposedElement.validateComposedElement(value, type, function (node) {
            return ListItemNode.validateListItemNode(node, validateBlockNode);
        });
        return isValid ? value : null;
    }
}

export namespace ListItemNode {
    export const TYPE = 'list-item';

    export function isListItemNode<ListItem extends ListItemNode<Block>, Block extends Node>(
        value: any,
    ): value is ListItem {
        return ComposedElement.isComposedElement(value, ListItemNode.TYPE);
    }

    export function validateListItemNode<ListItem extends ListItemNode<Block>, Block extends Node>(
        value: any,
        validateChildNode: (node: any) => Block | null,
    ): ListItem | null {
        const isValid = ComposedElement.validateComposedElement(value, TYPE, validateChildNode);
        return isValid ? value : null;
    }
}

export namespace ListItemTextNode {
    export const TYPE = 'list-item-text';

    export function isListItemTextNode<ListItemText extends ListItemTextNode<Inline>, Inline extends Node>(
        value: any,
    ): value is ListItemText {
        return ComposedElement.isComposedElement(value, ListItemTextNode.TYPE);
    }

    export function validateListItemTextNode<ListItemText extends ListItemTextNode<Inline>, Inline extends Node>(
        value: any,
        validateChildNode: (node: any) => Inline | null,
    ): ListItemText | null {
        const isValid = ComposedElement.validateComposedElement(value, TYPE, validateChildNode);

        return isValid ? value : null;
    }
}
