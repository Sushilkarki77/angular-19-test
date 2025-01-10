import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResultsComponentComponent } from './new-results-component.component';

describe('NewResultsComponentComponent', () => {
  let component: NewResultsComponentComponent;
  let fixture: ComponentFixture<NewResultsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewResultsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewResultsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
