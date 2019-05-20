import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInfoPage } from './location-info.page';

describe('LocationInfoPage', () => {
  let component: LocationInfoPage;
  let fixture: ComponentFixture<LocationInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
