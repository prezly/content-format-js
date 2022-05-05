# Prezly Content Format

_Stories_ in Prezly are using structured document format to store the content.

Using structured content gives lots of advantages over traditional HTML markup: 
structured content can be easily extended to allow embedding images, galleries, 
contact cards and file attachments right into the content itself.
While being possible to present the content in different mediums: 
web, email, markdown, plaintext, PDF and so on.

Story images, files attachments, videos and all the various types embedded content 
are stored directly in the content document.

Please refer to [Prezly Developer Portal][developers] for additional information on using Prezly API.  

## Concepts

Every object in a Prezly Content Format document is a `Node`.

```ts
type Node = Element | Text;
```

There are two core types of nodes: _Text_ and _Element_.

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

2. `Element` objects represent any kind of rich content in a document (block or inline).
   All elements are required to have `type` property, plus additional properties specific
   to the given *Element* type:

    ```ts
    interface Element {
        type: string;
    }
    ```

3. Some elements may be composed of other nodes and therefore have `children` array property:

    ```ts
    interface ComposedElement extends Element {
        children: Node[];
    }
    ```

4. `Document` – the object containing the whole content structure.
   All top-level nodes inside a document are always block-level *Elements*.

    ```ts
    interface Document extends Element {
        type: 'document';
        version: string;
        children: Element[];
    }
    ```

## Elements

There is a number of block and inline elements our editor can generate.

- [AttachmentNode](packages/content-format/src/model/elements/AttachmentNode.ts)
- [BookmarkNode](packages/content-format/src/model/elements/BookmarkNode.ts)
- [ContactNode](packages/content-format/src/model/elements/ContactNode.ts)
- [CoverageNode](packages/content-format/src/model/elements/CoverageNode.ts)
- [DividerNode](packages/content-format/src/model/elements/DividerNode.ts)
- [EmbedNode](packages/content-format/src/model/elements/EmbedNode.ts)
- [GalleryNode](packages/content-format/src/model/elements/GalleryNode.ts)
- [HeadingNode](packages/content-format/src/model/elements/HeadingNode.ts)
- [HtmlNode](packages/content-format/src/model/elements/HtmlNode.ts)
- [ImageNode](packages/content-format/src/model/elements/ImageNode.ts)
- [LinkNode](packages/content-format/src/model/elements/LinkNode.ts)
- [ListNode](packages/content-format/src/model/elements/ListNode.ts)
- [MentionNode](packages/content-format/src/model/elements/MentionNode.ts)
- [ParagraphNode](packages/content-format/src/model/elements/ParagraphNode.ts)
- [PlaceholderNode](packages/content-format/src/model/elements/PlaceholderNode.ts)
- [QuoteNode](packages/content-format/src/model/elements/QuoteNode.ts)
- [VideoNode](packages/content-format/src/model/elements/VideoNode.ts)

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


[developers]: https://developers.prezly.com/?utm_medium=web&utm_source=github&utm_campaign=@prezly/content-format-js

## Credits

Brought to you with :heart: by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=prezly/content-format-js) &mdash; PR software for better, faster communication.
