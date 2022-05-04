export * from '@prezly/uploads';
export * from './format';
export * from './traits';

import * as Email from './EmailContent';
import * as Note from './NoteContent';
import * as Story from './StoryContent';

export type EmailPlaceholderType = Email.PlaceholderType;
export type EmailDocument = Email.Document;
export const EmailContent = {
    validate: Email.validate,
};

export type NoteDocument = Note.Document;
export const NoteDocument = {
    validate: Note.validate,
};

export type StoryPlaceholderType = Story.PlaceholderType;
export type StoryDocument = Story.Document;
export const StoryDocument = {
    validate: Story.validate,
};
