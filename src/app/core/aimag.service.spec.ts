import { TestBed } from '@angular/core/testing';

import { AimagService } from './aimag.service';

describe('AimagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AimagService = TestBed.get(AimagService);
    expect(service).toBeTruthy();
  });
});
