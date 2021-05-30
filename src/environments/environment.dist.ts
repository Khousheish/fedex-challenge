import { SupportedLanguages } from '@Enums/supported-languages.enum';
import { Environment } from '@Models/environment.model';

export const environment: Environment = {
  production: false,
  apiUrl: '',
  defaultLang: SupportedLanguages.English,
  appTitle: 'FedexChallenge',
};