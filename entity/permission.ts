export interface Ipermission {
  id: number;
  menuchildeng: string;
  name: string;
  menuchildname: string;
  menuname: string;
  idmenu: number;
  idmenuchild: number;
  view_read: boolean;
  view_create: boolean;
  view_edit: boolean;
  view_delete: boolean;
  permission: JSON;
  userid: string;
}
