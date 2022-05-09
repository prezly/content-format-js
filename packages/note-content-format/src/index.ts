import * as Core from '@prezly/content-format';

export type DocumentNode = Core.DocumentNode<BlockNode>;
export namespace DocumentNode {
    export import TYPE = Core.DocumentNode.TYPE;

    export function isDocumentNode(value: any): value is DocumentNode {
        return Core.DocumentNode.isDocumentNode(value);
    }

    export function validateDocumentNode(value: any): DocumentNode | null {
        return Core.DocumentNode.validateDocumentNode(value, BlockNode.validateBlockNode);
    }
}

export type Node = InlineNode | BlockNode;
export namespace Node {
    export function isNode(value: any): value is Node {
        return InlineNode.isInlineNode(value) || BlockNode.isBlockNode(value);
    }

    export function validateNode(value: any): Node | null {
        return InlineNode.validateInlineNode(value) ?? BlockNode.validateBlockNode(value);
    }
}

export type ComposedElement = ParagraphNode;
export namespace ComposedElement {
    export function isComposedElement(value: any): value is ComposedElement {
        return ParagraphNode.isParagraphNode(value);
    }

    export function validateComposedElement(value: any): ComposedElement | null {
        return ParagraphNode.validateParagraphNode(value);
    }
}

export type InlineNode = LinkNode | MentionNode | Text;
export namespace InlineNode {
    export function isInlineNode(value: any): value is InlineNode {
        return ParagraphNode.isParagraphNode(value);
    }

    export function validateInlineNode(value: any): InlineNode | null {
        return Text.validateText(value) ?? MentionNode.validateMentionNode(value);
    }
}

export type BlockNode = ParagraphNode;
export namespace BlockNode {
    export function isBlockNode(value: any): value is BlockNode {
        return ParagraphNode.isParagraphNode(value);
    }

    export function validateBlockNode(value: any): BlockNode | null {
        return ParagraphNode.validateParagraphNode(value);
    }
}

// NODES

// Inline nodes
export type Text = Core.Stylable<Core.Text>;
export namespace Text {
    export function isText(value: any): value is Text {
        return Core.Text.isText(value);
    }

    export function validateText(value: any): Text | null {
        return Core.Text.validateText(value);
    }
}

export type LinkNode = Core.LinkNode<Text>;
export namespace LinkNode {
    export function isLinkNode(value: any): value is LinkNode {
        return Core.LinkNode.isLinkNode(value);
    }

    export function validateLinkNode(value: any): LinkNode | null {
        return Core.LinkNode.validateLinkNode(value, Text.validateText);
    }
}

export import MentionNode = Core.MentionNode;

// Block nodes
export type ParagraphNode = Core.ParagraphNode<InlineNode>;
export namespace ParagraphNode {
    export const TYPE = Core.ParagraphNode.TYPE;

    export function isParagraphNode(value: any): value is ParagraphNode {
        return Core.ParagraphNode.isParagraphNode(value);
    }

    export function validateParagraphNode(value: any): ParagraphNode | null {
        return Core.ParagraphNode.validateParagraphNode(value, InlineNode.validateInlineNode);
    }
}
