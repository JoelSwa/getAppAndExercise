import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkActivePage } from './walk-active.page';

describe('WalkActivePage', () => {
  let component: WalkActivePage;
  let fixture: ComponentFixture<WalkActivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkActivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkActivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
