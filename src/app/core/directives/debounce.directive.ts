import {from, fromEvent, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, mergeMap, takeUntil} from 'rxjs/operators';
import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {CONFIG} from '@app/configs/config';

@Directive({
  selector: '[appInputDebounce]',
})
export class DebounceDirective implements AfterViewInit, OnDestroy {
  @Output() public debounce: EventEmitter<any> = new EventEmitter();
  private destroy$ = new Subject();

  constructor(private elementRef: ElementRef) {}

  /**
   * Used to process search logic
   */
  public ngAfterViewInit() {
    const events = ['keydown', 'keyup'];
    from(events)
      .pipe(
        mergeMap((event) => fromEvent(this.elementRef.nativeElement, event)),
        debounceTime(CONFIG.debounce_time),
        distinctUntilChanged(),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: KeyboardEvent) => {
        this.debounce.emit((event.target as HTMLInputElement).value);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
