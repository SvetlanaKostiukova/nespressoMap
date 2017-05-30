import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, animate, style } from "@angular/animations";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less'],
  animations:[
    trigger('popUp', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate("0.3s ease-out", style({ opacity: 1}))
      ]),
      transition(":leave", [
        animate("0.3s ease-in", style({ opacity: 0 }))
      ])
    ]),
  ]
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
      top -= 2*popupHeight/5 + 15;
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
