import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the RestoGalleryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resto-gallery',
  templateUrl: 'resto-gallery.html'
})
export class RestoGalleryComponent {

  @Input() resto: any

  constructor(public sanitizer: DomSanitizer) {
  }

}
