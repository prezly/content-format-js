import { type UploadedFile, isUploadedFile } from '@prezly/uploads';
import { type Element, isElement } from '../Element';

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
    const isValid = isAttachmentNode(value) && typeof value.description === 'string' && isUploadedFile(value.file);

    return isValid ? value : null;
}
