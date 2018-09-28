import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { AimagService } from '../../../core/aimag.service';
import { StatData } from '../../../core/stat-data';
import { DataConfig } from '../../../core/data-config';
import { Aimags } from '../../../core/aimags';

@Component({
  selector: 'app-imap',
  templateUrl: './imap.component.html',
  styleUrls: ['./imap.component.css']
})
export class ImapComponent implements OnInit {
  map_zoom: number;
  map_y: number;
  map_x: number;

  @ViewChild('map') map: ElementRef;
  // aimag_map: AimagMapClass[] = [];
  @ViewChild('a00') a00: ElementRef;
  @ViewChild('a01') a01: ElementRef;
  @ViewChild('a02') a02: ElementRef;
  @ViewChild('a03') a03: ElementRef;
  @ViewChild('a04') a04: ElementRef;
  @ViewChild('a05') a05: ElementRef;
  @ViewChild('a06') a06: ElementRef;
  @ViewChild('a07') a07: ElementRef;
  @ViewChild('a08') a08: ElementRef;
  @ViewChild('a09') a09: ElementRef;
  @ViewChild('a10') a10: ElementRef;
  @ViewChild('a11') a11: ElementRef;
  @ViewChild('a12') a12: ElementRef;
  @ViewChild('a13') a13: ElementRef;
  @ViewChild('a14') a14: ElementRef;
  @ViewChild('a15') a15: ElementRef;
  @ViewChild('a16') a16: ElementRef;
  @ViewChild('a17') a17: ElementRef;
  @ViewChild('a18') a18: ElementRef;
  @ViewChild('a19') a19: ElementRef;
  @ViewChild('a20') a20: ElementRef;
  @ViewChild('a21') a21: ElementRef;

  @Input() data: StatData[];
  @Input() dataconfig: DataConfig[];
  @Input() selectedDataConfig: DataConfig;
  @Input() aimags: any[];

  @Output() selectedAimag = new EventEmitter<Aimags>();

  AimagName: any;
  AimagValue: any;
  title_x: any;
  title_y: any;

  constructor(private service: DataService, private aimag_service: AimagService) { }

  ngOnInit() { }

  getAimagMap(aid: number): any {
    switch (aid - 1) {
      case 0:
        return this.a00;
      case 1:
        return this.a01;
      case 2:
        return this.a02;
      case 3:
        return this.a03;
      case 4:
        return this.a04;
      case 5:
        return this.a05;
      case 6:
        return this.a06;
      case 7:
        return this.a07;
      case 8:
        return this.a08;
      case 9:
        return this.a09;
      case 10:
        return this.a10;
      case 11:
        return this.a11;
      case 12:
        return this.a12;
      case 13:
        return this.a13;
      case 14:
        return this.a14;
      case 15:
        return this.a15;
      case 16:
        return this.a16;
      case 17:
        return this.a17;
      case 18:
        return this.a18;
      case 19:
        return this.a19;
      case 20:
        return this.a20;
      case 21:
        return this.a21;
      default:
        return this.a20;
    }
  }
  getAimag(aid: number) {
    return this.aimags.find(x => x.AimagID == aid);
  }
  getAimagValue(aid: number, datakey: any): any {
    return this.data.find(x => x.id == aid)[datakey];
  }

  momap(aid: number, $event) {
    // let ap = this.getAimagMap(aid).nativeElement;
    // ap.setAttribute("opacity", "0.7");
    // this.AimagName = this.aimags.find(x => x.AimagID == aid).AimagName;
    // this.AimagValue = this.getAimagValue(aid, this.selectedDataConfig.dun);
    // this.title_x = $event.pageX;
    // this.title_y = $event.pageY;
  }
  moutmap(aid: number) {
    // let ap = this.getAimagMap(aid).nativeElement;
    // ap.setAttribute("opacity", "1");
  }
  selectAimag(aid: number) {
    this.selectedAimag.emit(this.getAimag(aid));
  }
  calcColor(percent: number): string {
    console.log(percent);
    if (percent >= 0.5) {
      return '#F25F5C';
    }
    else {
      return '#247BA0';
    }
  }
  calcOpacity(percent: number): number {
    if (percent >= 0.5) {
      return percent;
    }
    else {
      return 1 - percent;
    }
  }
}
