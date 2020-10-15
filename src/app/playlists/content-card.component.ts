import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-card',
  template: `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{title}}</h4>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ContentCardComponent implements OnInit {
  @Input()
  title = '';

  @Input()
  content = '';

  constructor() { }

  ngOnInit(): void {
  }

}
