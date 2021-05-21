import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationoutPutComponent } from './operationout-put.component';

describe('OperationoutPutComponent', () => {
  let component: OperationoutPutComponent;
  let fixture: ComponentFixture<OperationoutPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationoutPutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationoutPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
