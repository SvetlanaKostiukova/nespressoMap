import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {
  @Input() blends:any[] = [];
  firstIdx:number = 0;
  leftShift:string = "0%";
  selectedIdx:number = -1;
  @Output() onBlendSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  sanitize(imgName: string){
    var path = "url('./../../assets/images/" + imgName + ".svg')";
    return this.sanitizer.bypassSecurityTrustStyle(path);
  }

  onSelect(e:any, blend: any){
    console.log(e)
    this.selectedIdx = this.blends.indexOf(blend);
    var x = e.clientX;
    var y = e.clientY;
    var elem = e.target;

    x = elem.offsetLeft + 28;
    y = elem.offsetParent.offsetTop + 20;
    this.onBlendSelected.emit({ blend: blend, x:x, y:y });
  }

  onShift(forward: boolean){
    this.firstIdx += forward? 1: -1;
    if(this.firstIdx < 0)
      this.firstIdx = this.blends.length - 1;
    else if(this.firstIdx > this.blends.length  - 1)
      this.firstIdx = 0;
    this.leftShift = -25*this.firstIdx + "%"; 
  }
}
