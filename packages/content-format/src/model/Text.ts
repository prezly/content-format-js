export interface Text {
    text: string;
}

export function isText(value: any): value is Text {
    return value && typeof value === 'object' && typeof value.text === 'string';
}

export function validateText(value: any): Text | null {
    return isText(value) ? value : null;
}
