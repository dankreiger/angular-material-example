import { MatTableDataSource } from '@angular/material';
import { ApiResource } from './ApiResource.model';

export interface DataTable {
  tableData: MatTableDataSource<ApiResource>;
  columnsToDisplay: string[];
}
