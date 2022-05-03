interface Styled {
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    subscript?: boolean;
    superscript?: boolean;
}

export interface Text extends Styled {
    text: string;
}

export function isText(value: any): value is Text {
    return value && typeof value === 'object' && typeof value.text === 'string';
}

export function validateText(value: any): Text | null {
    const isValid =
        isText(value) &&
        (value.bold === undefined || typeof value.bold === 'boolean') &&
        (value.italic === undefined || typeof value.italic === 'boolean') &&
        (value.underlined === undefined || typeof value.underlined === 'boolean') &&
        (value.subscript === undefined || typeof value.subscript === 'boolean') &&
        (value.superscript === undefined || typeof value.superscript === 'boolean');

    return isValid ? value : null;
}
