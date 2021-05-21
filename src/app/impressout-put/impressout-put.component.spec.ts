import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressoutPutComponent } from './impressout-put.component';

describe('ImpressoutPutComponent', () => {
  let component: ImpressoutPutComponent;
  let fixture: ComponentFixture<ImpressoutPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpressoutPutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressoutPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
