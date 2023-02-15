import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { combineLatest, startWith } from 'rxjs';

@Component({
  selector: 'stepper-editable-example',
  templateUrl: 'stepper-editable-example.html',
  styleUrls: ['stepper-editable-example.css'],
})
export class StepperEditableExample implements OnInit {
  costInputForm1 = this._formBuilder.group({
    B16: ['', Validators.required],
  });
  costInputForm2 = this._formBuilder.group({
    B17: ['', Validators.required],
  });
  costInputForm3 = this._formBuilder.group({
    B19: ['', Validators.required],
  });
  costInputForm4 = this._formBuilder.group({
    B20: ['', Validators.required],
  });
  // costInputForm = this._formBuilder.group({
  //   B16: new FormControl(),
  //   B17: new FormControl(),
  //   B18: new FormControl(5),
  //   B19: new FormControl(),
  //   B20: new FormControl(),
  //   B21: new FormControl(5),
  // });
  resultConsolidatedForm: { [key: string]: number | string | null } = {
    B18: 5,
    B21: 5,
    B28: 10,
    B29: 5,
  };

  ManagerResourceTDForm1 = this._formBuilder.group({
    B26: ['', Validators.required],
  });

  ManagerResourceTDForm2 = this._formBuilder.group({
    B27: ['', Validators.required],
  });

  ManagerResourceTDForm3 = this._formBuilder.group({
    B30: [5, Validators.required],
  });

  radioOptions: string[] = ['Yes', 'No'];
  min = 5;
  max = 30;
  step = 5;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    const CostInputFormobservables = {
      B16: this.costInputForm1.controls.B16.valueChanges.pipe(startWith(null)),
      B17: this.costInputForm2.controls.B17.valueChanges.pipe(startWith(null)),
      B19: this.costInputForm3.controls.B19.valueChanges.pipe(startWith(null)),
      B20: this.costInputForm4.controls.B20.valueChanges.pipe(startWith(null)),
      B26: this.ManagerResourceTDForm1.controls.B26.valueChanges.pipe(
        startWith(null)
      ),
      B27: this.ManagerResourceTDForm2.controls.B27.valueChanges.pipe(
        startWith(null)
      ),
      B30: this.ManagerResourceTDForm3.controls.B30.valueChanges.pipe(
        startWith(5)
      ),
    };
    combineLatest(CostInputFormobservables).subscribe({
      next: (latestVal) => {
        this.resultConsolidatedForm = {
          ...this.resultConsolidatedForm,
          B16: latestVal.B16,
          B17: latestVal.B17,
          B19: latestVal.B19,
          B20: latestVal.B20,
          B26: latestVal.B26,
          B27: latestVal.B27,
          B30: latestVal.B30,
        };
      },
    });
  }
}
