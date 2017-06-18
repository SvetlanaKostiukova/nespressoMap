import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit, OnChanges {
  @ViewChild('panel') panelDiv: ElementRef;
  @Input() blends:any[] = [];
  @Input() selectedBlend: any;
  firstIdx:number = 0;
  leftShift:string = "0%";
  selectedIdx:number = -1;
  shownItems: number = 8;
  @Output() shiftChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBlendSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
      this.shiftChanged.emit(0);//"calc(12.5% - 7px)");
  }

  sanitize(imgName: string){
    var path = "url('assets/images/" + imgName + ".png')";
    return this.sanitizer.bypassSecurityTrustStyle(path);
  }

  ngOnChanges(chngs){
    if(chngs.selectedBlend){
      var prevBlend = this.blends[this.selectedIdx];//chngs.selectedBlend.previousValue;
      var currBlend = chngs.selectedBlend.currentValue;
      if(JSON.stringify(prevBlend) != JSON.stringify(currBlend)){
        console.log("on changes")
        var idx = this.blends.indexOf(currBlend);
        if(idx > -1){
          var shift;
          if(idx > this.firstIdx + (this.shownItems - 1)){//3){
            shift = idx;
            if(this.blends.length - shift < this.shownItems)//4)
              shift = this.blends.length - this.shownItems;//4;
          } else if(idx < this.firstIdx){
            shift = idx - (this.shownItems - 1);//3;
            if(shift < 0)
              shift = 0;
          }
          this.firstIdx = shift !== undefined? shift: this.firstIdx;
          this.leftShift = -(100/this.shownItems)*this.firstIdx + "%";
          this.selectedIdx = idx;
          var shiftIdx = this.selectedIdx - this.firstIdx;
          this.shiftChanged.emit(shiftIdx);//"calc(" + (12.5 + 25*shiftIdx) + "% - 7px)")
        }
      }
    }
  }

  onSelect(e:any, blend: any){
    if(this.panelDiv && blend && this.blends.indexOf(blend) != this.selectedIdx){
      console.log("on select")
      this.selectedIdx = this.blends.indexOf(blend);
      var shift = this.selectedIdx - this.firstIdx;
      this.shiftChanged.emit(shift);//"calc(" + (12.5 + 25*shift) + "% - 7px)");
      setTimeout(() => this.onBlendSelected.emit(blend), 300);
    }
  }

  onShift(forward: number){
    this.firstIdx += forward;//? 1: -1;
    if(this.firstIdx < 0)
      this.firstIdx = 0;//this.blends.length - 1;
    else if(this.firstIdx > this.blends.length  - this.shownItems)//4)
      this.firstIdx = this.blends.length - this.shownItems;//4;//0;
    if(this.selectedIdx < this.firstIdx && this.selectedIdx > -1){
      // this.selectedIdx = this.firstIdx;
      this.onSelect(undefined, this.blends[this.firstIdx]);//selectedIdx]);
    } else if(this.selectedIdx > this.firstIdx + (this.shownItems - 1)){//3) {
      // this.selectedIdx = this.firstIdx + 3;
      this.onSelect(undefined, this.blends[this.firstIdx + (this.shownItems - 1)]);//3]);//this.selectedIdx]);
    }
    var shiftIdx = this.selectedIdx - this.firstIdx;
    this.shiftChanged.emit(shiftIdx);//"calc(" + (12.5 + 25*shiftIdx) + "% - 7.5px)")
    this.leftShift = -(100/this.shownItems)*this.firstIdx + "%";
  }
}
