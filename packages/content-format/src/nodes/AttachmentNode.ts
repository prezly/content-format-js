import { type UploadedFile, isUploadedFile } from '@prezly/uploads';
import { Element } from '../Element';

export interface AttachmentNode extends Element<typeof AttachmentNode.TYPE> {
    file: UploadedFile;
    description: string;
}

export namespace AttachmentNode {
    export const TYPE = 'attachment';

    export type File = UploadedFile;

    export function isAttachmentNode(value: any): value is AttachmentNode {
        return Element.isElement(value, TYPE);
    }

    export function validateAttachmentNode(value: any): AttachmentNode | null {
        const isValid = isAttachmentNode(value) && typeof value.description === 'string' && isUploadedFile(value.file);

        return isValid ? value : null;
    }
}
