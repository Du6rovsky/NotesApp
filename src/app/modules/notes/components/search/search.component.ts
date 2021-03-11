import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {SetQuerySearch} from '@app/shared/states/note.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public search = '';
  public searchForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.prepareSearchForm();
  }


  public prepareSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(''),
    });
  }

  public onSearch(q: string) {
    this.store.dispatch(new SetQuerySearch(q));
  }
}
