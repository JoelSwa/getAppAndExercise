import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationNewPage } from './location-new.page';

describe('LocationNewPage', () => {
  let component: LocationNewPage;
  let fixture: ComponentFixture<LocationNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
