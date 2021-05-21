import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressInputComponent } from './impress-input.component';

describe('ImpressInputComponent', () => {
  let component: ImpressInputComponent;
  let fixture: ComponentFixture<ImpressInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpressInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
