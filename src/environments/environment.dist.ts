import { SupportedLanguages } from '@Enums/supported-languages.enum';
import { Environment } from '@Models/environment.model';

export const environment: Environment = {
  production: false,
  apiUrl: 'https://demo-api.now.sh',
  verifyEmailAccessKey: '89c88f1d380a93daf8384359f0288a4e',
  defaultLang: SupportedLanguages.English,
  appTitle: 'FedexChallenge',
};
