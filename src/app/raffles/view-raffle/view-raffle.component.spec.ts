import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRaffleComponent } from './view-raffle.component';

describe('ViewRaffleComponent', () => {
  let component: ViewRaffleComponent;
  let fixture: ComponentFixture<ViewRaffleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRaffleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
