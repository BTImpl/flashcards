import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaigationFooterComponent } from './naigation-footer.component';

describe('NaigationFooterComponent', () => {
  let component: NaigationFooterComponent;
  let fixture: ComponentFixture<NaigationFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaigationFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaigationFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
