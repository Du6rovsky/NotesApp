import {NotesModule} from '@app/modules/notes/notes.module';

describe('NotesModule', () => {
  let notesModule: NotesModule;

  beforeEach(() => {
    notesModule = new NotesModule();
  });

  it('should create an instance', () => {
    expect(notesModule).toBeTruthy();
  });
});
