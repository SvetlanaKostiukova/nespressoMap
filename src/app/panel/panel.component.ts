import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {
  @Input() blends:any[] = [];
  selectedIdx:number = 0;
  @Output() onBlendSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  sanitize(imgName: string){
    var path = "url('./../../assets/images/" + imgName + ".svg')";
    return this.sanitizer.bypassSecurityTrustStyle(path);
  }

  onSelect(e:any, blend: any){
    this.selectedIdx = this.blends.indexOf(blend);
    var x = e.clientX;
    var y = e.clientY;
    var elem = e.target;

    x = elem.offsetLeft + 37;
    y = elem.offsetParent.offsetTop + 28;
    this.onBlendSelected.emit({ blend: blend, x:x, y:y });
  }
}
