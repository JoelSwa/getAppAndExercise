import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkNewPage } from './walk-new.page';

describe('WalkNewPage', () => {
  let component: WalkNewPage;
  let fixture: ComponentFixture<WalkNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
