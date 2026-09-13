/** @format */

export default function convertType(choiceType: string) {
  switch (choiceType) {
    case "menus":
      return "Nos menus";
    case "connect":
      return "Se connecter";
    case "contact":
      return "Contacts";
    default:
      return "Accueil";
  }
}
