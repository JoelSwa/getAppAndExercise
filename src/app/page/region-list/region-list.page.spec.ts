import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionListPage } from './region-list.page';

describe('RegionListPage', () => {
  let component: RegionListPage;
  let fixture: ComponentFixture<RegionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
