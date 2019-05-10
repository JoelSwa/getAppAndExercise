import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkListPage } from './walk-list.page';

describe('WalkListPage', () => {
  let component: WalkListPage;
  let fixture: ComponentFixture<WalkListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
