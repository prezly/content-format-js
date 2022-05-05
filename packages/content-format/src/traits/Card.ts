export enum CardLayout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export interface Card {
    layout: CardLayout;
    show_thumbnail: boolean;
    new_tab: boolean;
}
