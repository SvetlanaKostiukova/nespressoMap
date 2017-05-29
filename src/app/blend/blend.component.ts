import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blend',
  templateUrl: './blend.component.html',
  styleUrls: ['./blend.component.less']
})
export class BlendComponent implements OnInit {
  @Input() blend: any;

  constructor() { }

  ngOnInit() {
  }

}
