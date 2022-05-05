import * as Core from '@prezly/content-format';
import type {
    BlockNode,
    ComposedElement,
    DocumentNode,
    InlineNode,
    MentionNode,
    Node,
    ParagraphNode,
    Text,
} from './types';

export const isDocument = (value: any): value is DocumentNode => Core.isDocumentNode(value);
export const isNode = (value: any): value is Node => Core.isNode(value);
export const isComposedElement = (value: any): value is ComposedElement => Core.isComposedElement(value);

// Inline nodes
export const isText = (value: any): value is Text => Core.isText(value);
export const isMentionNode = (value: any): value is MentionNode => Core.isMentionNode(value);

// Block nodes
export const isParagraphNode = (value: any): value is ParagraphNode => Core.isParagraphNode(value);

// Groups
export const isInlineNode = (value: any): value is InlineNode => isText(value) || isMentionNode(value);
export const isBlockNode = (value: any): value is BlockNode => isParagraphNode(value);
