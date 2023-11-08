import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTableComponent } from './checkbox-table.component';

describe('CheckboxTableComponent', () => {
  let component: CheckboxTableComponent;
  let fixture: ComponentFixture<CheckboxTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxTableComponent]
    });
    fixture = TestBed.createComponent(CheckboxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
