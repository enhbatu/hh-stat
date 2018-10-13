import { NewEmploymentModule } from './new-employment.module';

describe('NewEmploymentModule', () => {
  let newEmploymentModule: NewEmploymentModule;

  beforeEach(() => {
    newEmploymentModule = new NewEmploymentModule();
  });

  it('should create an instance', () => {
    expect(newEmploymentModule).toBeTruthy();
  });
});
