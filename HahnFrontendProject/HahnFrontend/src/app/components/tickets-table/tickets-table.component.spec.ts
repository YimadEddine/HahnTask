import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsTableComponent } from './tickets-table.component';

describe('TicketsTableComponent', () => {
  let component: TicketsTableComponent;
  let fixture: ComponentFixture<TicketsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketsTableComponent]
    });
    fixture = TestBed.createComponent(TicketsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
