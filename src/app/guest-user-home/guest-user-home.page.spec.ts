import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestUserHomePage } from './guest-user-home.page';

describe('GuestUserHomePage', () => {
  let component: GuestUserHomePage;
  let fixture: ComponentFixture<GuestUserHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestUserHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestUserHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
