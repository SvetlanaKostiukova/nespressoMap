import { DomSanitizer } from '@angular/platform-browser';
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
        animate("0.3s ease-in", style({ opacity: 0}))
      ])
    ]),
    // trigger('changesAnimation', [
    //   transition('* => void', [
    //     style({ opacity: 0 }),
    //     animate("0.3s ease-out", style({ opacity: 1}))
    //   ]),
    //   transition("void => *", [
    //     animate("0.3s ease-in", style({ opacity: 0, background:"green"}))
    //   ])
    // ]),
  ]
})
export class PopupComponent implements OnInit, OnChanges {
  @Input() country:any;
  @Output() onClosePopup:EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedBlends:any[] = [];
  currentBlend:number = 0;
  leftShift:string = "0%";
  @ViewChild('popup') popupDiv:ElementRef;

  isRight:boolean = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.leftShift = "calc(12.5% - 7px)";
  }

  ngOnChanges(){
    this.currentBlend = 0;
  }

  sanitize(imgName: string){
    var path = "url('assets/images/" + imgName + ".png')";
    return this.sanitizer.bypassSecurityTrustStyle(path);
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
      if(window.innerWidth > 649){
        popup.style.top = this.country.popupX + "px";//this.calculateTop();
        popup.style.left = this.country.popupY + "px";//this.calculateLeft();
      }
    }
  }

  onShift(forward: number){
    this.currentBlend += forward;
    if(this.currentBlend > this.selectedBlends.length - 1){
      this.currentBlend = 0;
    } else if(this.currentBlend < 0){
      this.currentBlend = this.selectedBlends.length - 1;
    }
  }
}
