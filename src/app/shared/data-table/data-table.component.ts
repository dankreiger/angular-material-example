import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataTable } from 'src/app/core/models/DataTable.model';
import { ApiResource } from 'src/app/core/models/ApiResource.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  private _tableData: MatTableDataSource<ApiResource>;
  private _columnsToDisplay: string[] = [];

  @Output() itemSelected: EventEmitter<ApiResource> = new EventEmitter<
    ApiResource
  >();

  @Input() set data(data: DataTable) {
    console.log('data', data);
    this._tableData = data.tableData;
    this._columnsToDisplay = data.columnsToDisplay;
  }

  get tableData(): MatTableDataSource<ApiResource> {
    return this._tableData;
  }

  get columnsToDisplay(): string[] {
    return this._columnsToDisplay;
  }

  applyFilter(filterValue: string) {
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  updateItems(currentRow) {
    const newData = this.tableData.filteredData.map(row => {
      if (row !== currentRow) {
        row.selected = false;
      }
      return row;
    });

    this._tableData = new MatTableDataSource(newData);
  }

  onRowClicked(row: ApiResource) {
    row.selected = !row.selected;
    this.updateItems(row);
    this.itemSelected.emit(row);
  }

  reInit(data: DataTable) {
    this.data = data;
    this.cdr.markForCheck();
  }
}
