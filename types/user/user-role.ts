/** User role type */
export enum UserRole {
  rolename = "Admin",
}
export enum UserRead {
  rolename = "Admin",
}

export enum Listrole {
  dataobj,
}

function ToArray(enumme: any) {
  return Object.keys(enumme)
    .filter(String)
    .map((key) => enumme[key]);
}

export async function GetRoleCreate() {
  const decoder = new TextDecoder("utf-8");
  const text = decoder.decode(await Deno.readFile("Rolefile/Create.txt"));
  // Deno.readTextFile("Rolefile/Create.txt").then((data) => {
  //   dataobj = JSON.parse(data);
  // });
  return ToArray(JSON.parse(text));
}

export async function GetRoleUpdate() {
  const decoder = new TextDecoder("utf-8");
  const text = decoder.decode(await Deno.readFile("Rolefile/Update.txt"));
  // Deno.readTextFile("Rolefile/Create.txt").then((data) => {
  //   dataobj = JSON.parse(data);
  // });
  return ToArray(JSON.parse(text));
}

export async function GetRoleRead() {
  const decoder = new TextDecoder("utf-8");
  const text = decoder.decode(await Deno.readFile("Rolefile/Read.txt"));
  // Deno.readTextFile("Rolefile/Create.txt").then((data) => {
  //   dataobj = JSON.parse(data);
  // });
  return ToArray(JSON.parse(text));
}

export async function GetRoleDelete() {
  const decoder = new TextDecoder("utf-8");
  const text = decoder.decode(await Deno.readFile("Rolefile/Delete.txt"));
  // Deno.readTextFile("Rolefile/Create.txt").then((data) => {
  //   dataobj = JSON.parse(data);
  // });
  return ToArray(JSON.parse(text));
}

const decoder = new TextDecoder("utf-8");
const text = decoder.decode(await Deno.readFile("Rolefile/Create.txt"));
/**
 * list of user roles
 */
export const UserRoles = ToArray(JSON.parse(text));
export const UserRole1 = ToArray(UserRead);
