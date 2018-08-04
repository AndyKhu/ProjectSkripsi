import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the RestoMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resto-menu',
  templateUrl: 'resto-menu.html'
})
export class RestoMenuComponent {

  @Input() resto: any

  constructor(public sanitizer: DomSanitizer) {
  }

  formatTitle (string) {
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1)
  }

  priceFormated (value) {
    let tmp = value
    if (value < 1000) return tmp
    // else return tmp.slice(0, tmp.length - 3)
    else return (tmp / 1000).toFixed(1)
  }
}
