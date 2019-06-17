export type SharedComponent = 'data-table' | 'date-picker';

export interface SharedComponentData {
  path: string;
  components: SharedComponent[];
}
