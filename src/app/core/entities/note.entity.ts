import {ToolBoxService} from '@app/core/utils/toolbox.service';
import {Injector} from '@angular/core';

const injector = Injector.create({
  providers: [
    {provide: ToolBoxService},
  ]
});

const tb = injector.get(ToolBoxService);

export class NoteEntity {
  public id: string;
  public header: string;
  public content: string;
  public tags: string[];
  public date: string;

  constructor() {
    this.id = tb.genNewId();
    this.header = 'Default header';
    this.content = 'Default content';
    this.tags = [];
    this.date = '';
  }
}
