import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbarComponent } from './ibar.component';

describe('IbarComponent', () => {
  let component: IbarComponent;
  let fixture: ComponentFixture<IbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
