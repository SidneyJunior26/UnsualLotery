import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RafflesListComponent } from './raffles-list.component';

describe('RafflesListComponent', () => {
  let component: RafflesListComponent;
  let fixture: ComponentFixture<RafflesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RafflesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RafflesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
