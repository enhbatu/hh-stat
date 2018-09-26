import { IchartModule } from './ichart.module';

describe('IchartModule', () => {
  let ichartModule: IchartModule;

  beforeEach(() => {
    ichartModule = new IchartModule();
  });

  it('should create an instance', () => {
    expect(ichartModule).toBeTruthy();
  });
});
