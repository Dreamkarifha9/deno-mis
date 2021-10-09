export interface Irepairhistorymachine {
  id: string;
  cause: string;
  detail: string | null;
  userid: string | null;
  pm: boolean | null;
  breakdown: boolean | null;
  documentimg: string | null;
  moreimg: string | null;
  remarks: string | null;
  createat: Date | null;
  createby: string | null;
  updateat: Date | null;
  updateby: string | null;
  createrepair: Date | null;
  idmachine: string;
  machinedetail: string;
  name: string | null;
}
