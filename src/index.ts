export * from '@prezly/uploads';
export * from './model';
export * from './traits';

import * as Email from './EmailDocument';
import * as Note from './NoteDocument';
import * as Story from './StoryDocument';

export type EmailPlaceholderType = Email.PlaceholderType;
export type EmailContent = Email.Document;
export const EmailContent = {
    validate: Email.validate,
};

export type NoteContent = Note.Document;
export const NoteContent = {
    validate: Note.validate,
};

export type StoryPlaceholderType = Story.PlaceholderType;
export type StoryContent = Story.Document;
export const StoryContent = {
    validate: Story.validate,
};
