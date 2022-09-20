import { Element } from '../Element';
import { isNonEmptyString } from '../validation';

export interface VariableNode<Key extends string> extends Element<typeof VariableNode.TYPE> {
    key: `${Key}`;
}

export namespace VariableNode {
    export const TYPE = 'variable';

    export function isVariableNode<Variable extends VariableNode<Key>, Key extends string = string>(
        value: any,
    ): value is Variable {
        return Element.isElement(value, VariableNode.TYPE);
    }

    export function validateVariableNode<Placeholder extends VariableNode<string>>(value: any): Placeholder | null;

    export function validateVariableNode<Placeholder extends VariableNode<Key>, Key extends string>(
        value: any,
        isValidKey: (key: string) => key is Key,
    ): Placeholder | null;

    export function validateVariableNode(value: any, isValidKey: (key: string) => boolean = isNonEmptyString) {
        const isValid = isVariableNode(value) && typeof value.key === 'string' && isValidKey(value.key);

        return isValid ? value : null;
    }
}
