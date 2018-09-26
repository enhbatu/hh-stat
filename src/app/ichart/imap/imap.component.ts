import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../shared/data.service';
import { AimagService } from '../../core/aimag.service';
import { StatData } from '../shared/stat-data';
import { DataConfig } from '../shared/data-config';

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

  statcolor: string;
  parentclass: any;
  data: StatData[];
  dataconfig: DataConfig[];
  selectedDataConfig: DataConfig;

  constructor(private service: DataService, private aimag_service: AimagService) { }

  ngOnInit() {
    // this.map_zoom = this.map.nativeElement.getBoundingClientRect().width * 0.45;
    this.data = [];
    // Load config
    this.service.getconfig().subscribe((result) => {
      this.dataconfig = result;
      this.selectedDataConfig = this.dataconfig[0];
      this.statcolor = this.selectedDataConfig.color;
      this.getdata(this.selectedDataConfig.percent);
    });
  }
  getdata(datakey: any) {
    this.service.getdata(this.parentclass).subscribe((result) => {
      this.data = result;
      let max = Math.max.apply(Math, this.data.map(function (o) { return o[datakey]; }))
      console.log(datakey);
      this.data.forEach(d => {
        d.cpercent = d[datakey] / max;
      });
      this.data.sort((n1, n2) => {
        if (n1.id > n2.id) {
          return 1;
        }

        if (n1.id < n2.id) {
          return -1;
        }
        return 0;
      });
    });
  }
  momap(aid: number, $event) {
    // let ap = this.getAimagMap(aid).nativeElement;
    // ap.setAttribute("opacity", "0.7");
    // this.AimagName = this.Aimags.find(x => x.AimagID == aid).AimagName;
    // this.AimagValue = this.getAimagValue(aid, this.selectedDataConfig.dun);
    // this.title_x = $event.pageX;
    // this.title_y = $event.pageY;
  }
  moutmap(aid: number) {
    // let ap = this.getAimagMap(aid).nativeElement;
    // ap.setAttribute("opacity", "1");
  }
  selectAimag(content, aid: number) {
  }
}
