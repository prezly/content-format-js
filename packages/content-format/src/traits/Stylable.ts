interface Styled {
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    subscript?: boolean;
    superscript?: boolean;
}

export type Stylable<T extends Record<string, any>> = T & Styled;