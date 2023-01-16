import {TestBed, waitForAsync} from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  describe('Init test', () => {
    test('should be created', () => {
      expect(service).toBeTruthy();
    });
    test('default value should be ...', waitForAsync(() => {
      service[`isLoading`].subscribe(loading => expect(loading).toBeFalsy());
    }));
  });

  describe('Typescript test', () => {
    describe('[isLoading]', () => {
      test('BehaviorSubject => Observable', waitForAsync(() => {
        service[`isLoading`].next(true);
        service.loading$.subscribe(loading => expect(loading).toBeTruthy());
      }));
      test('update behaviorSubject', waitForAsync(() => {
        service.setLoadingState(false);
        service[`isLoading`].subscribe(loading => expect(loading).toBeFalsy());
      }));
    });
  });
});
