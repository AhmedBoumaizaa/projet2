import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { watchGuard } from './watch-guard';

describe('watchGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => watchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
