import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImapComponent } from './imap/imap.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImapComponent,
  ],
  exports: [ImapComponent]
})
export class IchartModule { }
