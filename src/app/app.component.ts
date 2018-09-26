import { Component } from '@angular/core';
import { DataService } from './core/data.service';
import { AimagService } from './core/aimag.service';
import { StatData } from './core/stat-data';
import { Aimags } from './core/aimags';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subtitle: string;
  datatitle: string;
  mainclasses: any[] = [];
  mainclass: any;
  parentclass: any;
  AimagValue: any;
  dataconfig: any;
  subclass: string;
  selectedDataConfig: any;
  subclassName: any;
  data: StatData[];
  aimags: Aimags[];
  selectedAimag: Aimags;

  constructor(private service: DataService, private aimagService: AimagService) {

  }

  ngOnInit() {
    // Load config
    this.service.getconfig().subscribe((result) => {
      this.dataconfig = result;
      this.selectedDataConfig = this.dataconfig[0];
    });
    this.aimagService.getdata().subscribe((result) => {
      this.aimags = result;
    })
  }

  loadMainClass(): void {
    this.mainclasses = [];
    if (this.parentclass == 1) {
      this.mainclasses.push({ id: 0, Name: "Ажил мэргэжлийн ангиллаар" });
      this.mainclasses.push({ id: 1, Name: "Насны бүлгээр" });
      this.mainclasses.push({ id: 2, Name: "Эдийн засгийн үйл ажиллагааны салбарын ангиллаар " });
    }
    if (this.parentclass == 2) {
      this.mainclasses.push({ id: 0, Name: "Ажил хайж байгаа шалтгаанаар" });
      this.mainclasses.push({ id: 1, Name: "Насны бүлгээр" });
      // this.mainclasses.push({ id: 2, Name: "Боловсролын түвшнээр" });
    }
    if (this.mainclass == undefined)
      this.mainclass = 0;
    this.loadSubClass();
  }

  loadSubClass(): void {
    this.service.getconfig().subscribe((result) => {
      if (this.dataconfig != undefined) {
        this.dataconfig = result.filter(x => x.parentclass == this.parentclass && x.mainclass == this.mainclass);
        this.subclass = "0";
        this.selectData();
      }
    });
  }

  selectData(): void {
    if (this.dataconfig != undefined) {
      this.getDataName(this.subclass);
      this.getdata(this.parentclass, this.selectedDataConfig.percent);
    }
  }

  getdata(parentclass: number, datakey: any) {
    this.service.getdata(parentclass).subscribe((result) => {
      this.data = result;
      this.loadDataForMap(this.selectedDataConfig.percent);
    });
  }

  loadDataForMap(datakey: any) {
    this.service.sortDataById(
      this.service.calcCPercentData(this.data, datakey),
      datakey
    );
  }
  getDataName(id: any) {
    if (this.dataconfig != undefined) {
      for (var i = 0; i < this.dataconfig.length; i++) {
        if (id == this.dataconfig[i].id) {
          this.selectedDataConfig = this.dataconfig[i];
          this.subclassName = this.dataconfig[i].Name;
          return;
        }
      }
    }
  }
  onSelectAimag(aimag: Aimags) {
    this.selectedAimag = aimag;
    console.log(this.selectedAimag);
  }
}
