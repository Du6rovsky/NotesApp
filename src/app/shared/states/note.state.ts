import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NoteEntity} from '@app/core/entities/note.entity';

export class SetNotes {
  public static readonly type = '[Note] Set notes';

  constructor(public notes: NoteEntity[]) {}
}

export class SetActiveNote {
  public static readonly type = '[Note] Set active note';
  constructor(public note: NoteEntity) {}
}

export class SetTags {
  public static readonly type = '[Note] Set tags';
  constructor(public tags: string[]) {}
}

export class SetActiveTag {
  public static readonly type = '[Note] Set active tag';
  constructor(public tag: string) {}
}

export class SetQuerySearch {
  public static readonly type = '[Note] Set query search';
  constructor(public q: string) {}
}

export class NoteItem {
  public notes: NoteEntity[];
  public activeNote: NoteEntity;
  public tags: string[];
  public activeTag: string;
  public q: string;
}

@State<NoteItem>({
  name: 'note',
  defaults: {
    notes: [],
    activeNote: null,
    tags: [],
    activeTag: null,
    q: ''
  },
})
@Injectable()
export class NoteState {
  @Selector()
  public static notes(state: NoteItem) {
    return state.notes;
  }

  @Selector()
  public static active_note(state: NoteItem) {
    return state.activeNote;
  }

  @Selector()
  public static tags(state: NoteItem) {
    return state.tags;
  }

  @Selector()
  public static active_tag(state: NoteItem) {
    return state.activeTag;
  }

  @Selector()
  public static q(state: NoteItem) {
    return state.q;
  }

  constructor() {
  }

  @Action(SetNotes)
  public setNotes({getState, setState, patchState}: StateContext<NoteItem>, data: any) {
    patchState({
      notes: data.notes,
    });
  }

  @Action(SetActiveNote)
  private setActiveNote({getState, setState, patchState}: StateContext<NoteItem>, data: any) {
    patchState({
      activeNote: data.note,
    });
  }

  @Action(SetTags)
  public setTags({getState, setState, patchState}: StateContext<NoteItem>, data: any) {
    patchState({
      tags: data.tags,
    });
  }

  @Action(SetActiveTag)
  private setActiveTag({getState, setState, patchState}: StateContext<NoteItem>, data: any) {
    patchState({
      activeTag: data.tag,
    });
  }

  @Action(SetQuerySearch)
  private setQuerySearch({getState, setState, patchState}: StateContext<NoteItem>, data: any) {
    patchState({
      q: data.q,
    });
  }
}
