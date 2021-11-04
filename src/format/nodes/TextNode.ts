interface Styled {
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    subscript?: boolean;
    superscript?: boolean;
}

export interface TextNode extends Styled {
    text: string;
}
