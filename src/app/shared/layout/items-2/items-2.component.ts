import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-layout-items-2',
  templateUrl: './items-2.component.html',
  styleUrls: ['./items-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Items2Component implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  private _itemOneClass: string;
  private _itemTwoClass: string;

  private formatClassArray(classes: string[]) {
    return classes ? classes.join(' ') : '';
  }

  @Input() set itemOneColClasses(classes: string[]) {
    this._itemOneClass = this.formatClassArray(classes);
  }

  @Input() set itemTwoColClasses(classes: string[]) {
    this._itemTwoClass = this.formatClassArray(classes);
  }

  get itemOneClass(): string {
    return this._itemOneClass;
  }

  get itemTwoClass(): string {
    return this._itemTwoClass;
  }

  @ContentChild('itemOne', { static: false })
  itemOne;
  @ContentChild('itemTwo', { static: false })
  itemTwo;

  @ViewChild('colOne', { static: true }) colOne: ElementRef;
  @ViewChild('colTwo', { static: true }) colTwo: ElementRef;

  ngOnInit() {
    this.colOne.nativeElement.className = `itemCol One ${this.itemOneClass}`;
    this.colTwo.nativeElement.className = `itemCol Two ${this.itemTwoClass}`;
  }
  reInit(itemOneClass, itemTwoClasses) {
    this.itemOneColClasses = itemOneClass;
    this.itemTwoColClasses = itemTwoClasses;
    this.ngOnInit();
    this.cdr.markForCheck();
  }
}
