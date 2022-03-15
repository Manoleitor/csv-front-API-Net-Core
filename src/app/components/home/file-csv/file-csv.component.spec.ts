import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCsvComponent } from './file-csv.component';

describe('FileCsvComponent', () => {
  let component: FileCsvComponent;
  let fixture: ComponentFixture<FileCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
