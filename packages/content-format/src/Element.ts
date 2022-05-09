import { isObject } from './validation';

export interface Element<Type extends string = string> {
    type: Type;
}

export namespace Element {
    export function isElement(value: any): value is Element;

    export function isElement<E extends Element<T>, T extends string>(value: any, type: T): value is E;

    export function isElement(value: any, type?: string): boolean {
        if (isObject(value) && typeof value.type === 'string') {
            return type === undefined || value.type === type;
        }
        return false;
    }
}
