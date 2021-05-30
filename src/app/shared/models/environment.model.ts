import { SupportedLanguages } from '@Enums/supported-languages.enum';

export interface Environment {
  production: boolean;
  apiUrl: string;
  verifyEmailAccessKey: string;
  defaultLang: SupportedLanguages;
  appTitle: string;
}
