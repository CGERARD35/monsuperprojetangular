import {of} from 'rxjs';
import fn = jest.fn;

export const translateServiceMock  = {
  get: fn(() => of('key')),
  setDefaultLang: fn((arg) => {}),
  use: fn((arg) => {}),
  instant: fn((arg) => arg),
  onLangChange: of('fr'),
};
