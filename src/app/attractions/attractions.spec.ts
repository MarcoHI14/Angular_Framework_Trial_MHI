import { TestBed } from '@angular/core/testing';
import { AttractionsComponent } from './attractions';

describe('AttractionsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AttractionsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

