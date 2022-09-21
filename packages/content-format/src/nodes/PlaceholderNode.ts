import { Element } from '../Element';

import Type = PlaceholderNode.Type;

export interface PlaceholderNode extends Element<Type> {}

export namespace PlaceholderNode {
    export type Type = `placeholder:${string}`;

    export function isPlaceholderType(type: string): type is Type {
        return type.startsWith('placeholder:');
    }

    export function isPlaceholderNode(value: any): value is PlaceholderNode;
    export function isPlaceholderNode<T extends Type>(value: any, type?: T): value is PlaceholderNode & { type: T };
    export function isPlaceholderNode(value: any, type?: Type): boolean {
        if (type !== undefined) {
            return Element.isElement(value, type);
        }
        return Element.isElement(value) && isPlaceholderType(value.type);
    }

    export function validatePlaceholderNode(value: any): PlaceholderNode | null {
        const isValid = isPlaceholderNode(value);
        return isValid ? value : null;
    }
}
