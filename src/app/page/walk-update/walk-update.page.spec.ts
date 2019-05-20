import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkUpdatePage } from './walk-update.page';

describe('WalkUpdatePage', () => {
  let component: WalkUpdatePage;
  let fixture: ComponentFixture<WalkUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
