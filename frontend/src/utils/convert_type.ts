/** @format */

export default function convertType(choiceType: string) {
  switch (choiceType) {
    case 'menus':
      return 'Nos menus';
    case 'connect':
      return 'Espace Personnel';
    case 'contact':
      return 'Contacts';

    default:
      return 'Accueil';
  }
}
