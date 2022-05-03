import type { UploadedFile } from '@prezly/uploads';
import type { Element } from '../Element';
import { isElement } from '../Element';
import { isUploadedFile } from '@prezly/uploads';

export const AttachmentNode = {
    TYPE: 'attachment',
};

export interface AttachmentNode extends Element<typeof AttachmentNode.TYPE> {
    file: UploadedFile;
    description: string;
}

export function isAttachmentNode(value: any): value is AttachmentNode {
    return isElement(value, AttachmentNode.TYPE);
}

export function validateAttachmentNode(value: any): AttachmentNode | null {
    const isValid =
        isAttachmentNode(value) &&
        typeof value.description === 'string' &&
        isUploadedFile(value.file);

    return isValid ? value : null;
}
