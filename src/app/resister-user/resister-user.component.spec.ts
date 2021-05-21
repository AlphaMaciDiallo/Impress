import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResisterUserComponent } from './resister-user.component';

describe('ResisterUserComponent', () => {
  let component: ResisterUserComponent;
  let fixture: ComponentFixture<ResisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResisterUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
