import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from './shared/ui/sidebar/sidebar.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    RouterModule.forRoot(routes), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
