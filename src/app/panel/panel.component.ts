import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {
  @ViewChild('panel') panelDiv: ElementRef;
  @Input() blends:any[] = [];
  firstIdx:number = 0;
  leftShift:string = "0%";
  selectedIdx:number = -1;
  @Output() shiftChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBlendSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  sanitize(imgName: string){
    var path = "url('assets/images/" + imgName + ".svg')";
    return this.sanitizer.bypassSecurityTrustStyle(path);
  }

  onSelect(e:any, blend: any){
    if(this.panelDiv){
      var panel = this.panelDiv.nativeElement;
      this.selectedIdx = this.blends.indexOf(blend);
      var elem = e.target;
      var x = elem.offsetLeft + 24;//e.clientX;
      var y = elem.offsetTop + 20;//e.clientY;
      console.log(e, elem.offsetLeft, elem, panel.offsetTop)

      var offsetParent = elem.offsetParent;
      while(offsetParent && offsetParent != panel){
        console.log(x, y)
        x += offsetParent.offsetLeft;
        y += offsetParent.offsetTop;
        offsetParent = offsetParent.offsetParent;
      }

      x += panel.offsetLeft;
      y += panel.offsetTop;
      var app = document.getElementsByClassName("app").item(0);
      var ratio = 650 / app.clientWidth;
      console.log("end", x*ratio, y*ratio, app.clientWidth)

      this.onBlendSelected.emit({ blend: blend, x:x*ratio, y:y*ratio });
    }
  }

  onShift(forward: boolean){
    this.firstIdx += forward? 1: -1;
    if(this.firstIdx < 0)
      this.firstIdx = this.blends.length - 1;
    else if(this.firstIdx > this.blends.length  - 1)
      this.firstIdx = 0;
    if(this.selectedIdx < this.firstIdx && this.selectedIdx > -1){
      this.selectedIdx = this.firstIdx;
      //this.
    } else if(this.selectedIdx > this.firstIdx + 3)
      this.selectedIdx = this.firstIdx + 3;
    this.leftShift = -25*this.firstIdx + "%";//"calc("+ -25*this.firstIdx + "vw + 8px)";
    this.shiftChanged.emit("calc(" + -25*this.firstIdx + "% + 10px)");
    console.log(this.leftShift)// - 1.25*this.firstIdx + 1.25*((this.firstIdx+1)) + "%"; 
  }
}
