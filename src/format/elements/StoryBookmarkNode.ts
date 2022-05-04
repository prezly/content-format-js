import type { Element } from '../Element';
import type { Card } from '../../traits';

export const StoryBookmarkNode = {
    TYPE: 'story-bookmark',
};

export interface StoryBookmarkNode extends Element<typeof StoryBookmarkNode.TYPE>, Card {
    uuid: string;
    story: {
        uuid: string;
    };
}
