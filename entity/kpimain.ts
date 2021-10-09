export interface Ikpimain {
  id: string;
  datecurrent: Date;
  create_date: Date | null;
  create_by: string;
  update_date: Date | null;
  update_by: string;
  division_fk: number;
  division_status: boolean;
  division_statusall: boolean;
}
