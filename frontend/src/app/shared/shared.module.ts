import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { RouterModule } from '@angular/router';
import { StarAverageComponent } from './star-average/star-average.component';

@NgModule({
  declarations: [CarouselComponent, ProductItemComponent, StarAverageComponent],
  imports: [CommonModule, RouterModule],
  exports: [CarouselComponent, ProductItemComponent, StarAverageComponent],
})
export class SharedModule {}
