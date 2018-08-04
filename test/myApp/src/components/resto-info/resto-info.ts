import { Component, Input } from '@angular/core';

/**
 * Generated class for the RestoInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resto-info',
  templateUrl: 'resto-info.html'
})
export class RestoInfoComponent {

  @Input() resto: any

  constructor() {
  }

}
