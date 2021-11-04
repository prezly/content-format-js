interface Styled {
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    subscript?: boolean;
    superscript?: boolean;
}

export interface Text extends Styled {
    text: string;
}
