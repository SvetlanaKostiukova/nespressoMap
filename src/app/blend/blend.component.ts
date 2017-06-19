import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, animate, style } from "@angular/animations";

@Component({
  selector: 'app-blend',
  templateUrl: './blend.component.html',
  styleUrls: ['./blend.component.less'],
  animations:[
    trigger('popUp', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate("0.5s ease-out", style({ opacity: 1}))
      ]),
      transition(":leave", [
        animate("0.3s ease-out", style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class BlendComponent implements OnInit {
  @Input() blend: any;
  @Input() blends: any[] = [];
  @Input() leftShift: string = "0%";

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  sanitize(value: string){
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }
}
