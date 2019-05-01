import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionNewPage } from './region-new.page';

describe('RegionNewPage', () => {
  let component: RegionNewPage;
  let fixture: ComponentFixture<RegionNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
