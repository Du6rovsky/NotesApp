import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {rootRouting} from '@app/app.routing';
import {AppComponent} from '@app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DirectivesModule} from '@app/core/directives/directives.module';
import {ClickOutsideModule} from 'ng-click-outside';
import {NgxsModule} from '@ngxs/store';
import {states} from '@app/shared/states/app.state';
import {environment} from '@env/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DirectivesModule,
    ClickOutsideModule,
    rootRouting,
    NgxsModule.forRoot(states, {developmentMode: !environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
