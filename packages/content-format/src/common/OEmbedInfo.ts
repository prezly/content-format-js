import { isEnum, isNonEmptyString, isObject } from '../validation';

export namespace OEmbedInfo {
    export enum Type {
        VIDEO = 'video',
        PHOTO = 'photo',
        RICH = 'rich',
        LINK = 'link',
    }

    export function isOEmbedInfo(value: any): value is OEmbedInfo {
        return (
            isObject(value) &&
            value.version === '1.0' &&
            isNonEmptyString(value.url) &&
            isEnum(value.type, Type) &&
            (value.title === undefined || typeof value.title === 'string') &&
            (value.description === undefined || typeof value.description === 'string') &&
            (value.screenshot_url === undefined || typeof value.screenshot_url === 'string') &&
            (value.thumbnail_url === undefined || typeof value.thumbnail_url === 'string') &&
            (value.thumbnail_width === undefined || typeof value.thumbnail_width === 'number') &&
            (value.thumbnail_height === undefined || typeof value.thumbnail_height === 'number') &&
            (value.author_name === undefined || typeof value.author_name === 'string') &&
            (value.author_url === undefined || typeof value.author_url === 'string') &&
            (value.provider_name === undefined || typeof value.provider_name === 'string') &&
            (value.provider_url === undefined || typeof value.provider_url === 'string') &&
            (value.cache_age === undefined || typeof value.cache_age === 'number') &&
            (value.html === undefined || typeof value.html === 'string') &&
            (value.width === undefined || typeof value.width === 'number') &&
            (value.height === undefined || typeof value.height === 'number')
        );
    }
}

export interface OEmbedInfo {
    version: '1.0';
    url: string;
    type: OEmbedInfo.Type;
    title?: string;
    description?: string;
    screenshot_url?: string;
    thumbnail_url?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
    author_name?: string;
    author_url?: string;
    provider_name?: string;
    provider_url?: string;
    cache_age?: number;
    html?: string;
    width?: number;
    height?: number;
}

