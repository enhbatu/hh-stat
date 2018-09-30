import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImapComponent } from './components/imap/imap.component';
import { IbarComponent } from './components/ibar/ibar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImapComponent,
    IbarComponent,
  ],
  exports: [ImapComponent]
})
export class IchartModule { }
