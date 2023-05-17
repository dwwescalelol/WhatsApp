import I18n from 'ex-react-native-i18n';
import * as Localization from 'expo-localization';

import en from './en.json';
import es from './es.json';
import cy from './cy.json';
import fr from './fr.json';
import cn from './cn.json';

I18n.translations = {
  en,
  es,
  cn,
  fr,
  cy,
};

export async function getLanguage() {
  try {
    const choice = Localization.locale;
    await I18n.initAsync();
    I18n.locale = 'cy';
    // I18n.locale = choice.substring(0, 2);
  } catch (err) {
    console.log(err);
  }
}

export function t(key) {
  return I18n.t(key);
}
