import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from '@ngxs/store';
import {NoteState, SetActiveTag} from '@app/shared/states/note.state';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  @Output() activeTagEvent: EventEmitter<any> = new EventEmitter<any>();

  public tags: string[] = [];
  public activeTag: string;
  public destroy$ = new Subject();

  constructor(
    private store: Store,
  ) {
    this.store
      .select(NoteState.tags)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.tags = res;
        }
      });

    this.store
      .select(NoteState.active_tag)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeTag = res;
      });
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public filterByTag(tag: string) {
    this.activeTag = this.activeTag === tag ? null : tag;
    this.store.dispatch(new SetActiveTag(this.activeTag));
    this.activeTagEvent.emit(this.activeTag);
  }
}
