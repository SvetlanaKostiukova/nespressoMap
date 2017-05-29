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
    console.log(e);
    this.selectedIdx = this.blends.indexOf(blend);
    this.onBlendSelected.emit({ blend: blend, x:e.clientX, y:e.clientY });
  }
}
