import type { UploadedFile } from '../common';
import type { Element } from './Element';

export interface AttachmentNode extends Element {
    type: 'attachment';
    file: UploadedFile;
    description: string;
}
