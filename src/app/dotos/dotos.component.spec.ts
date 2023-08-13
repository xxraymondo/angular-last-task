import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotosComponent } from './dotos.component';

describe('DotosComponent', () => {
  let component: DotosComponent;
  let fixture: ComponentFixture<DotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DotosComponent]
    });
    fixture = TestBed.createComponent(DotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
