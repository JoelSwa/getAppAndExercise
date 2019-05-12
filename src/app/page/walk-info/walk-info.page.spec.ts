import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInfoPage } from './walk-info.page';

describe('WalkInfoPage', () => {
  let component: WalkInfoPage;
  let fixture: ComponentFixture<WalkInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
