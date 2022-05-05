type Uuid = string;

const REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function isUuid(value: any): value is Uuid {
    return typeof value === 'string' && value.length === 36 && REGEX.test(value);
}
