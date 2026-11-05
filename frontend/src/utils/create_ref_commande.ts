/** @format */

export default function createREfCommande(
  utilisateur_id: number,
  menu_id: number,
): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Format compact : YYYYMMDDHHmmss (ex: 20260612143022)
  const dateComm = `${year}${month}${day}${hours}${minutes}${seconds}`;
  const commandeREf = `REF - ${utilisateur_id}${dateComm}${menu_id}`;

  return commandeREf;
}
