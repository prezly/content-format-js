import { type Element, isElement } from '../Element';
import { isNonEmptyString } from '../validation';

export const PlaceholderNode = {
    TYPE: 'placeholder',
};

export interface PlaceholderNode<Key extends string> extends Element<typeof PlaceholderNode.TYPE> {
    key: Key;
}

export function isPlaceholderNode<
    Placeholder extends PlaceholderNode<Key>,
    Key extends string = string,
>(value: any): value is Placeholder {
    return isElement(value, PlaceholderNode.TYPE);
}

export function validatePlaceholderNode<Placeholder extends PlaceholderNode<string>>(
    value: any,
): Placeholder | null;

export function validatePlaceholderNode<
    Placeholder extends PlaceholderNode<Key>,
    Key extends string,
>(value: any, isValidKey: (key: string) => key is Key): Placeholder | null;

export function validatePlaceholderNode(
    value: any,
    isValidKey: (key: string) => boolean = isNonEmptyString,
) {
    const isValid =
        isPlaceholderNode(value) && typeof value.key === 'string' && isValidKey(value.key);

    return isValid ? value : null;
}
