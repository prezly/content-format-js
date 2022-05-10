import { ComposedElement } from '../ComposedElement';
import type { Node } from '../Node';

export interface HeadingNode<Child extends Node> extends ComposedElement<`${HeadingNode.Type}`, Child> {}

export namespace HeadingNode {
    export enum Type {
        HEADING_ONE = 'heading-one',
        HEADING_TWO = 'heading-two',
    }

    export function isHeadingNode<Heading extends HeadingNode<Child>, Child extends Node>(value: any): value is Heading;

    export function isHeadingNode<Heading extends HeadingNode<Child>, Child extends Node>(
        value: any,
        type: Type,
    ): value is Heading;

    export function isHeadingNode(value: any, type?: `${Type}`) {
        if (type === undefined) {
            return (
                ComposedElement.isComposedElement(value) &&
                (value.type === Type.HEADING_ONE || value.type === Type.HEADING_TWO)
            );
        }
        return ComposedElement.isComposedElement(value, type);
    }

    export function validateHeadingNode<Heading extends HeadingNode<Child>, Child extends Node>(
        value: any,
        validateChildNode: (node: any) => Child | null,
    ): Heading | null;

    export function validateHeadingNode<Heading extends HeadingNode<Child>, Child extends Node>(
        value: any,
        type: `${Type}`,
        validateChildNode: (node: any) => Child | null,
    ): Heading | null;

    export function validateHeadingNode(value: any, ...params: [ValidateFn] | [`${Type}`, ValidateFn]) {
        if (params.length === 2) {
            const [type, validateChildNode] = params;
            const isValid = ComposedElement.validateComposedElement(value, type, validateChildNode);

            return isValid ? value : null;
        }

        const [validateChildNode] = params;
        const isValid =
            isHeadingNode(value) && ComposedElement.validateComposedElement(value, value.type, validateChildNode);

        return isValid ? value : null;
    }
}

type ValidateFn = (node: any) => Node | null;
