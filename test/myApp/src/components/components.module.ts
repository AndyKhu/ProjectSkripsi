import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RestoInfoComponent } from './resto-info/resto-info';
import { RestoGalleryComponent } from './resto-gallery/resto-gallery';
import { RestoReviewsComponent } from './resto-reviews/resto-reviews';
import { Ionic2RatingModule } from "ionic2-rating";
import { RestoMenuComponent } from './resto-menu/resto-menu';
@NgModule({
	declarations: [RestoInfoComponent,
    RestoGalleryComponent,
    RestoReviewsComponent,
    RestoMenuComponent],
	imports: [
		IonicModule,
		Ionic2RatingModule
	],
	exports: [RestoInfoComponent,
    RestoGalleryComponent,
    RestoReviewsComponent,
    RestoMenuComponent]
})
export class ComponentsModule {}
