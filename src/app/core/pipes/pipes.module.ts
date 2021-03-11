import {NgModule} from '@angular/core';
import {OrderByPipe} from '@app/core/pipes/order_by.pipe';

@NgModule({
  declarations: [
    OrderByPipe
  ],
  exports: [
    OrderByPipe
  ],
})
export class PipesModule {
}
