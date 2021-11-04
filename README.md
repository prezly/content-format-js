# Prezly Content Format

_Stories_ in Prezly are using structured document format to store the content.

Using structured content gives lots of advantages over traditional HTML markup: 
structured content can be easily extended to allow embedding images, galleries, 
contact cards and file attachments right into the content itself.
While being possible to present the content in different mediums: 
web, email, markdown, plaintext, PDF and so on.

Story images, files attachments, videos and all the various types embedded content 
are stored directly in the content document.

## Concepts

There are two types of objects in Prezly Content Format: _Text_ and _Nodes_.

1. `Text` object is representing a portion of text with styling information:

    ```ts
    interface Text {
        text: string;
        // styling
        bold?: boolean;
        italic?: boolean;
        underlined?: boolean;
        subscript?: boolean;
        superscript?: boolean;
    }
    ```

2. `Node` objects represent any kind of rich content in a document (block or inline).
   All nodes have `type` property:

    ```ts
    interface Node {
        type: string;
    }
    ```

3. Some nodes may contain other nodes or text objects as children, 
   we call them `Element` nodes.

    ```ts
    interface Element extends Node {
        children: (Element | Node | Text)[];
    }
    ```

5. `Document` – the object containing the whole content structure.

    ```ts
    interface Document extends Element {
        type: 'document';
        version: string;
        children: Element[];
    }
    ```

## Elements

There is a number of block and inline elements our editor can generate.

- [AttachmentNode](./src/format/elements/AttachmentNode.ts)
- [ContactNode](./src/format/elements/ContactNode.ts)
- [CoverageNode](./src/format/elements/CoverageNode.ts)
- [DividerNode](./src/format/elements/DividerNode.ts)
- [EmbedNode](./src/format/elements/EmbedNode.ts)
- [GalleryNode](./src/format/elements/GalleryNode.ts)
- [HeadingNode](./src/format/elements/HeadingNode.ts)
- [HtmlNode](./src/format/elements/HtmlNode.ts)
- [ImageNode](./src/format/elements/ImageNode.ts)
- [LinkNode](./src/format/elements/LinkNode.ts)
- [ListNode](./src/format/elements/ListNode.ts)
- [MentionNode](./src/format/elements/MentionNode.ts)
- [ParagraphNode](./src/format/elements/ParagraphNode.ts)
- [PlaceholderNode](./src/format/elements/PlaceholderNode.ts)
- [QuoteNode](./src/format/elements/QuoteNode.ts)

## Example document

```json
{
    "version": "0.50",
    "type": "document",
    "children": [
        {
            "type": "heading-one",
            "children": [
                {
                    "text": "5 Reasons to Start Using Prezly for Media Relations"
                }
            ]
        },
        {
            "type": "paragraph",
            "children": [
                {
                    "text": "Learn about our media relations software that helps manage media contacts, create online newsrooms, develop visual press releases and much more."
                }
            ]
        },
        {
            "type": "image-block",
            "href": "",
            "file": {
                "version": 2,
                "uuid": "5cb61330-1b4d-48a8-ba28-b7e1f23b001a",
                "filename": "usage stats.png",
                "mime_type": "image/png",
                "size": 682301,
                "original_width": 1024,
                "original_height": 768,
                "effects": []
            },
            "layout": "expanded",
            "width": "100%",
            "width_factor": "100%",
            "children": [
                {
                    "text": "Usage stats for Q1 2021"
                }
            ]
        },
        {
            "type": "heading-two",
            "children": [
                {
                    "text": "Save Time & Improve Media Relations",
                    "bold": true
                }
            ]
        },
        {
            "type": "paragraph",
            "children": [
                {
                    "text": "At Prezly we focus on making your day-to-day work more fluid, saving you time, all while helping you improve your media relations."
                }
            ]
        }
    ]
}

```

## Rendering

This content can be rendered into HTML, Markdown or any other format you may need using renderers.

// TODO: Link renderers implementation
