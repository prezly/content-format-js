import type { UploadedFile } from '../common';
import type { ElementNode } from './ElementNode';

export interface AttachmentNode extends ElementNode {
    type: 'attachment';
    file: UploadedFile;
    description: string;
}
