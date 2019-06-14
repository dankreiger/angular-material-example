import { NgModule } from '@angular/core';

/* modules */
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';

/* components */
import { HomeComponent } from './home.component';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
