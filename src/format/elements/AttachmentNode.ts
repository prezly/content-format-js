import type { UploadedFile } from '@prezly/uploads';
import type { Element } from '../Element';

export const AttachmentNode = {
    TYPE: 'attachment',
};

export interface AttachmentNode extends Element<typeof AttachmentNode.TYPE> {
    file: UploadedFile;
    description: string;
}
