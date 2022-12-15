import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleConfirmInfosComponent } from './raffle-confirm-infos.component';

describe('RaffleConfirmInfosComponent', () => {
  let component: RaffleConfirmInfosComponent;
  let fixture: ComponentFixture<RaffleConfirmInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaffleConfirmInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaffleConfirmInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
