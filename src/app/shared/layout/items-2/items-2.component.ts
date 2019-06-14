import {
  ChangeDetectionStrategy,
  Component,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-layout-items-2',
  templateUrl: './items-2.component.html',
  styleUrls: ['./items-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Items2Component {
  @ContentChild('itemOne', { static: false })
  itemOne;
  @ContentChild('itemTwo', { static: false })
  itemTwo;
}
