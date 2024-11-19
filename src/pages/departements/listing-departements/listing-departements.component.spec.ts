import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDepartementsComponent } from './listing-departements.component';

describe('ListingDepartementsComponent', () => {
  let component: ListingDepartementsComponent;
  let fixture: ComponentFixture<ListingDepartementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingDepartementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingDepartementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
