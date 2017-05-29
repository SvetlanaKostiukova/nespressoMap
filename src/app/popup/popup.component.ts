import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements OnInit, OnChanges {
  @Input() country:any;
  @Output() onClosePopup:EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('popup') popupDiv: ElementRef;

  isRight:boolean = false;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(){
    if(this.country){
      var left = this.country.coordX;
      if(left > 375) 
        this.isRight = false;
      else 
        this.isRight = true;
    }
  }

  calculateLeft(){
    var left = this.country.coordX;
    if(left > 375)
      left -= 337;
    else
      left += 13;
    return left + 'px';
  }

  calculateTop(){
    var top = this.country.coordY;
    if(this.popupDiv){
      var popup:HTMLElement = this.popupDiv.nativeElement;
      var popupHeight = popup.offsetHeight;
      top -= 2*popupHeight/5;
    }
    return top + 'px';
  }

  onClose(){
    this.onClosePopup.emit();
  }

  ngAfterViewChecked(){
    if(this.popupDiv){
      var popup:HTMLElement = this.popupDiv.nativeElement;
      popup.style.top = this.calculateTop();
      popup.style.left = this.calculateLeft();
    }
  }
}
