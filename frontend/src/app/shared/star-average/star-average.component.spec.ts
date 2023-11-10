import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarAverageComponent } from './star-average.component';

describe('StarAverageComponent', () => {
  let component: StarAverageComponent;
  let fixture: ComponentFixture<StarAverageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarAverageComponent],
    });
    fixture = TestBed.createComponent(StarAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
