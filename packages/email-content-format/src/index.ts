import * as Core from '@prezly/content-format';

export type DocumentNode = Core.DocumentNode<TopLevelNode>;
export namespace DocumentNode {
    export import TYPE = Core.DocumentNode.TYPE;

    export function isDocumentNode(value: any): value is DocumentNode {
        return Core.DocumentNode.isDocumentNode(value);
    }

    export function valueDocumentNode(value: any): DocumentNode | null {
        return Core.DocumentNode.validateDocumentNode(value, BlockNode.validateBlockNode);
    }
}

export type Node = DocumentNode | InlineNode | BlockNode;
export type TopLevelNode = Exclude<BlockNode, ListItemNode | ListItemTextNode>;
export namespace Node {
    export function isNode(value: any): value is Node {
        return InlineNode.isInlineNode(value) || BlockNode.isBlockNode(value);
    }

    export function valueNode(value: any): Node | null {
        return InlineNode.validateInlineNode(value) ?? BlockNode.validateBlockNode(value);
    }
}

export type InlineNode = LinkNode | VariableNode | Text;
export namespace InlineNode {
    export function isInlineNode(value: any): value is InlineNode {
        return Text.isText(value) || LinkNode.isLinkNode(value) || VariableNode.isVariableNode(value);
    }

    export function validateInlineNode(value: any): InlineNode | null {
        return Text.validateText(value) ?? LinkNode.validateLinkNode(value) ?? VariableNode.validateVariableNode(value);
    }
}

export type BlockNode =
    | AttachmentNode
    | BookmarkNode
    | CoverageNode
    | DividerNode
    | EmbedNode
    | HeadingNode
    | ImageNode
    | ListNode
    | ParagraphNode
    | QuoteNode
    | StoryBookmarkNode
    | StoryEmbedNode
    | VideoNode
    | TableNode
    | TableRowNode
    | TableCellNode;

export namespace BlockNode {
    export function isBlockNode(value: any): value is BlockNode {
        return (
            AttachmentNode.isAttachmentNode(value) ||
            CoverageNode.isCoverageNode(value) ||
            DividerNode.isDividerNode(value) ||
            EmbedNode.isEmbedNode(value) ||
            HeadingNode.isHeadingNode(value) ||
            ImageNode.isImageNode(value) ||
            ListNode.isListNode(value) ||
            ParagraphNode.isParagraphNode(value) ||
            QuoteNode.isQuoteNode(value) ||
            StoryBookmarkNode.isStoryBookmarkNode(value) ||
            StoryEmbedNode.isStoryEmbedNode(value) ||
            VideoNode.isVideoNode(value) ||
            TableNode.isTableNode(value) ||
            TableRowNode.isTableRowNode(value) ||
            TableCellNode.isTableCellNode(value)
        );
    }

    export function validateBlockNode(value: any): BlockNode | null {
        return (
            AttachmentNode.validateAttachmentNode(value) ??
            CoverageNode.validateCoverageNode(value) ??
            DividerNode.validateDividerNode(value) ??
            EmbedNode.validateEmbedNode(value) ??
            HeadingNode.validateHeadingNode(value) ??
            ImageNode.validateImageNode(value) ??
            ListNode.validateListNode(value) ??
            ParagraphNode.validateParagraphNode(value) ??
            QuoteNode.validateQuoteNode(value) ??
            StoryBookmarkNode.validateStoryBookmarkNode(value) ??
            StoryEmbedNode.validateStoryEmbedNode(value) ??
            VideoNode.validateVideoNode(value) ??
            TableNode.validateTableNode(value) ??
            TableRowNode.validateTableRowNode(value) ??
            TableCellNode.validateTableCellNode(value)
        );
    }
}

export type ComposedElement =
    | DocumentNode
    | LinkNode
    | HeadingNode
    | ParagraphNode
    | QuoteNode
    | ListNode
    | ListItemNode
    | ListItemTextNode
    | TableNode
    | TableRowNode
    | TableCellNode;

export namespace ComposedElement {
    export function isComposedElement(value: any): value is ComposedElement {
        return (
            DocumentNode.isDocumentNode(value) ||
            LinkNode.isLinkNode(value) ||
            HeadingNode.isHeadingNode(value) ||
            ParagraphNode.isParagraphNode(value) ||
            QuoteNode.isQuoteNode(value) ||
            ListNode.isListNode(value) ||
            ListItemNode.isListItemNode(value) ||
            ListItemTextNode.isListItemTextNode(value) ||
            TableNode.isTableNode(value) ||
            TableRowNode.isTableRowNode(value) ||
            TableCellNode.isTableCellNode(value)
        );
    }

    export function validateComposedElement(value: any): ComposedElement | null {
        return (
            DocumentNode.valueDocumentNode(value) ??
            LinkNode.validateLinkNode(value) ??
            HeadingNode.validateHeadingNode(value) ??
            ParagraphNode.validateParagraphNode(value) ??
            QuoteNode.validateQuoteNode(value) ??
            ListNode.validateListNode(value) ??
            ListItemNode.validateListItemNode(value) ??
            ListItemTextNode.validateListItemTextNode(value) ??
            TableNode.validateTableNode(value) ??
            TableRowNode.validateTableRowNode(value) ??
            TableCellNode.validateTableCellNode(value)
        );
    }
}

// NODES

export import Alignment = Core.Alignable.Alignment;
export import OEmbedInfo = Core.OEmbedInfo;

// Inline Nodes

export type Text = Core.Stylable<Core.Text>;
export namespace Text {
    export import Style = Core.Stylable.Style;

    export function isText(value: any): value is Text {
        return Core.Text.isText(value);
    }

    export function validateText(value: any): Text | null {
        return Core.Text.validateText(value);
    }
}

export type LinkNode = Core.LinkNode<Text>;
export namespace LinkNode {
    export import TYPE = Core.LinkNode.TYPE;

    export function isLinkNode(value: any): value is LinkNode {
        return Core.LinkNode.isLinkNode(value);
    }

    export function validateLinkNode(value: any): LinkNode | null {
        return Core.LinkNode.validateLinkNode(value, Text.validateText);
    }
}

export type VariableNode = Core.VariableNode<VariableNode.Key>;
export namespace VariableNode {
    export import TYPE = Core.VariableNode.TYPE;

    export enum Key {
        CONTACT_FIRST_NAME = 'contact.firstname',
        CONTACT_LAST_NAME = 'contact.lastname',
        CONTACT_FULL_NAME = 'contact.fullname',
        STORY_URL = 'release.url',
        STORY_SHORT_URL = 'release.shorturl',
    }

    export function isVariableNode(value: any): value is VariableNode {
        return Core.VariableNode.isVariableNode(value);
    }

    export function validateVariableNode(value: any): VariableNode | null {
        return Core.VariableNode.validateVariableNode(value, function (key): key is Key {
            return Object.values(Key).includes(key as Key);
        });
    }
}

// Block Nodes

export type AttachmentNode = Core.AttachmentNode;
export namespace AttachmentNode {
    export import TYPE = Core.AttachmentNode.TYPE;
    export import File = Core.AttachmentNode.File;

    export function isAttachmentNode(value: any): value is AttachmentNode {
        return Core.AttachmentNode.isAttachmentNode(value);
    }

    export function validateAttachmentNode(value: any): AttachmentNode | null {
        return Core.AttachmentNode.validateAttachmentNode(value);
    }
}

export import BookmarkNode = Core.BookmarkNode;
export import CoverageNode = Core.CoverageNode;
export import DividerNode = Core.DividerNode;
export import EmbedNode = Core.EmbedNode;
export import StoryBookmarkNode = Core.StoryBookmarkNode;
export import StoryEmbedNode = Core.StoryEmbedNode;
export import VideoNode = Core.VideoNode;

export type HeadingNode = Core.Alignable<Core.HeadingNode<InlineNode>, false>;
export namespace HeadingNode {
    export import Type = Core.HeadingNode.Type;
    export import Alignment = Core.Alignable.Alignment;

    export function isHeadingNode(value: any, type?: HeadingNode.Type): value is HeadingNode {
        return type ? Core.HeadingNode.isHeadingNode(value, type) : Core.HeadingNode.isHeadingNode(value);
    }

    export function validateHeadingNode(value: any): HeadingNode | null {
        return Core.Alignable.validateAlignable(
            Core.HeadingNode.validateHeadingNode(value, InlineNode.validateInlineNode),
            false,
        );
    }
}

export type ImageNode = Core.Alignable<Core.ImageNode>;
export namespace ImageNode {
    export import TYPE = Core.ImageNode.TYPE;
    export import File = Core.ImageNode.File;
    export import Width = Core.ImageNode.Width;
    export import Layout = Core.ImageNode.Layout;
    export import Alignment = Core.Alignable.Alignment;

    export function isImageNode(value: any): value is ImageNode {
        return Core.ImageNode.isImageNode(value);
    }

    export function validateImageNode(value: any): ImageNode | null {
        return Core.ImageNode.validateImageNode(value) as ImageNode | null;
    }
}

export type ParagraphNode = Core.Alignable<Core.ParagraphNode<InlineNode>, false>;
export namespace ParagraphNode {
    export import TYPE = Core.ParagraphNode.TYPE;
    export import Alignment = Core.Alignable.Alignment;

    export function isParagraphNode(value: any): value is ParagraphNode {
        return Core.ParagraphNode.isParagraphNode(value);
    }

    export function validateParagraphNode(value: any): ParagraphNode | null {
        return Core.ParagraphNode.validateParagraphNode(value, InlineNode.validateInlineNode);
    }
}

export type QuoteNode = Core.Alignable<Core.QuoteNode<InlineNode>, false>;
export namespace QuoteNode {
    export import TYPE = Core.QuoteNode.TYPE;
    export import Alignment = Core.Alignable.Alignment;

    export function isQuoteNode(value: any): value is QuoteNode {
        return Core.QuoteNode.isQuoteNode(value);
    }

    export function validateQuoteNode(value: any): QuoteNode | null {
        return Core.Alignable.validateAlignable<QuoteNode, false>(
            Core.QuoteNode.validateQuoteNode(value, InlineNode.validateInlineNode),
            false,
        );
    }
}

export type ListNode = Core.Alignable<RecursiveListNode, false>;
export namespace ListNode {
    export import Type = Core.ListNode.Type;
    export import Alignment = Core.Alignable.Alignment;

    export function isListNode(value: any): value is ListNode {
        return Core.ListNode.isListNode(value);
    }

    export function validateListNode(value: any, type?: Type): ListNode | null {
        return Core.Alignable.validateAlignable(
            type ? validateRecursiveListNode(value, type) : validateRecursiveListNode(value),
            false,
        );
    }
}

export type ListItemNode = Core.ListItemNode<ListItemTextNode | RecursiveListNode>;
export namespace ListItemNode {
    export import TYPE = Core.ListItemNode.TYPE;

    export function isListItemNode(value: any): value is ListItemNode {
        return Core.ListItemNode.isListItemNode(value);
    }

    export function validateListItemNode(value: any): ListItemNode | null {
        return Core.ListItemNode.validateListItemNode(value, function (value) {
            return ListItemTextNode.validateListItemTextNode(value) ?? validateRecursiveListNode(value);
        });
    }
}

export type ListItemTextNode = Core.ListItemTextNode<InlineNode>;
export namespace ListItemTextNode {
    export import TYPE = Core.ListItemTextNode.TYPE;

    export function isListItemTextNode(value: any): value is ListItemTextNode {
        return Core.ListItemTextNode.isListItemTextNode(value);
    }

    export function validateListItemTextNode(value: any): ListItemTextNode | null {
        return Core.ListItemTextNode.validateListItemTextNode(value, InlineNode.validateInlineNode);
    }
}

type RecursiveListNode = Core.ListNode<ListItemTextNode | RecursiveListNode>;

function validateRecursiveListNode(value: any, type?: ListNode.Type): RecursiveListNode | null {
    function validateBlock(value: any) {
        return ListItemTextNode.validateListItemTextNode(value) ?? validateRecursiveListNode(value);
    }

    return type
        ? Core.ListNode.validateListNode(value, type, validateBlock)
        : Core.ListNode.validateListNode(value, validateBlock);
}

export type TableNode = Core.TableNode<TableRowNode>;

export namespace TableNode {
    export import TYPE = Core.TableNode.TYPE;
    export import TableHeader = Core.TableNode.TableHeader;

    export function isTableNode(value: Node): value is TableNode {
        return Core.TableNode.isTableNode(value);
    }

    export function validateTableNode(value: any): TableNode | null {
        return Core.TableNode.validateTableNode(value, (n) => TableRowNode.validateTableRowNode(n));
    }
}

export type TableRowNode = Core.TableRowNode<TableCellNode>;

export namespace TableRowNode {
    export import TYPE = Core.TableRowNode.TYPE;

    export function isTableRowNode(value: Node): value is TableRowNode {
        return Core.TableRowNode.isTableRowNode(value);
    }

    export function validateTableRowNode(value: any): TableRowNode | null {
        return Core.TableRowNode.validateTableRowNode(value, (n) => TableCellNode.validateTableCellNode(n));
    }
}

export type TableCellNode = Core.TableCellNode<TableCellChildElement>;

export namespace TableCellNode {
    export import TYPE = Core.TableCellNode.TYPE;

    export function isTableCellNode(value: Node): value is TableCellNode {
        return Core.TableCellNode.isTableCellNode(value);
    }

    export function validateTableCellNode(value: any): TableCellNode | null {
        return Core.TableCellNode.validateTableCellNode(
            value,
            (n) => ParagraphNode.validateParagraphNode(n) || ListNode.validateListNode(n),
        );
    }
}

export type TableCellChildElement = ParagraphNode | ListNode;
