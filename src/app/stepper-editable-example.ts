import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { combineLatest, startWith } from 'rxjs';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'stepper-editable-example',
  templateUrl: 'stepper-editable-example.html',
  styleUrls: ['stepper-editable-example.css'],
})
export class StepperEditableExample implements OnInit {
  personalDetailsForm: FormGroup;
  costInputForm1: FormGroup;
  costInputForm2: FormGroup;
  ManagerResourceTDForm1: FormGroup;
  ManagerResourceTDForm2: FormGroup;
  ManagerResourceTDForm3: FormGroup;
  ManagersTimeDistributionForm1: FormGroup;
  ManagersTimeDistributionForm2: FormGroup;
  botForm: FormGroup;
  roiSummaryForm: FormGroup;
  resultConsolidatedForm: { [key: string]: any };
  botFields = {
    H26: 30,
    H27: 10,
    H28: 10,
    H29: 10,
    H30: 10,
    H33: 10,
    H34: 10,
    H35: 10,
  };
  radioOptions: string[] = ['Yes', 'No'];
  min = 5;
  max = 30;
  step = 5;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForms();
    this.initAndSubscribeFormChanges();
  }

  initForms() {
    this.personalDetailsForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.costInputForm1 = this._formBuilder.group({
      B16: ['', Validators.required],
      B17: ['', Validators.required],
    });
    this.costInputForm2 = this._formBuilder.group({
      B19: ['', Validators.required],
      B20: ['', Validators.required],
    });

    this.resultConsolidatedForm = {
      B18: 5,
      B21: 5,
      B28: 10,
      B29: 5,
      B35: 10,
      B36: 0,
    };

    this.ManagerResourceTDForm1 = this._formBuilder.group({
      B26: ['', Validators.required],
    });

    this.ManagerResourceTDForm2 = this._formBuilder.group({
      B27: ['', Validators.required],
    });

    this.ManagerResourceTDForm3 = this._formBuilder.group({
      B30: [5, Validators.required],
    });

    this.ManagersTimeDistributionForm1 = this._formBuilder.group({
      B33: ['', Validators.required],
    });

    this.ManagersTimeDistributionForm2 = this._formBuilder.group({
      B34: ['', Validators.required],
    });

    this.botForm = this._formBuilder.group({
      botUsage: ['', Validators.required],
    });

    this.roiSummaryForm = this._formBuilder.group({
      currentAnnualOperationsCost: ['', Validators.required],
      projectedAnnualOperationsCost: ['', Validators.required],
      savingsPercentOfCurrentCost: ['', Validators.required],
      enateAnnualCost: ['', Validators.required],
      annualNetSavings: ['', Validators.required],
      estimatedEffortOptimizationOfTeamLead: ['', Validators.required],
      estimatedEffortOptimizationOfFte: ['', Validators.required],
      enateCostOneOffSetup: ['', Validators.required],
      rolloutPeriod: [24, Validators.required],
      lagFromLicensesToSavings: [2, Validators.required],
    });
  }

  initAndSubscribeFormChanges() {
    const CostInputFormobservables = {
      firstName: this.personalDetailsForm.controls.firstName.valueChanges.pipe(
        startWith(null)
      ),
      lastName: this.personalDetailsForm.controls.lastName.valueChanges.pipe(
        startWith(null)
      ),
      email: this.personalDetailsForm.controls.email.valueChanges.pipe(
        startWith(null)
      ),
      B16: this.costInputForm1.controls.B16.valueChanges.pipe(startWith(null)),
      B17: this.costInputForm1.controls.B17.valueChanges.pipe(startWith(null)),
      B19: this.costInputForm2.controls.B19.valueChanges.pipe(startWith(null)),
      B20: this.costInputForm2.controls.B20.valueChanges.pipe(startWith(null)),
      B26: this.ManagerResourceTDForm1.controls.B26.valueChanges.pipe(
        startWith(null)
      ),
      B27: this.ManagerResourceTDForm2.controls.B27.valueChanges.pipe(
        startWith(null)
      ),
      B30: this.ManagerResourceTDForm3.controls.B30.valueChanges.pipe(
        startWith(5)
      ),
      B33: this.ManagersTimeDistributionForm1.controls.B33.valueChanges.pipe(
        startWith(null)
      ),
      B34: this.ManagersTimeDistributionForm2.controls.B34.valueChanges.pipe(
        startWith(null)
      ),
      bot: this.botForm.controls.botUsage.valueChanges.pipe(startWith(null)),
    };
    combineLatest(CostInputFormobservables).subscribe({
      next: (latestVal) => {
        this.resultConsolidatedForm = {
          ...this.resultConsolidatedForm,
          firstName: latestVal.firstName,
          lastName: latestVal.lastName,
          email: latestVal.email,
          B16: latestVal.B16,
          B17: latestVal.B17,
          B19: latestVal.B19,
          B20: latestVal.B20,
          B26: latestVal.B26 === 'Yes' ? 25 : latestVal.B26 === 'No' ? 0 : null,
          B27: latestVal.B27 === 'Yes' ? 10 : latestVal.B27 === 'No' ? 0 : null,
          B30: latestVal.B30,
          B33: latestVal.B33 === 'Yes' ? 20 : latestVal.B33 === 'No' ? 0 : null,
          B34: latestVal.B34 === 'Yes' ? 10 : latestVal.B34 === 'No' ? 0 : null,
          bot:
            latestVal.bot === 'No'
              ? 0
              : latestVal.bot === null
              ? null
              : this.botFields,
        };
      },
    });
  }

  CalculateROI() {
    this.roiSummaryForm.controls.rolloutPeriod.disable();
    this.roiSummaryForm.controls.lagFromLicensesToSavings.disable();
    //calculate and patch/set the values in the roiSummaryForm
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Net Cash position by month',
          font: {
            family: 'Comic Sans MS',
            size: 16,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 20, bottom: 0 },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Net Cash',
          font: {
            family: 'Times',
            size: 16,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 0, bottom: 0 },
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };
  public barChartLabels: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  public barChartType: ChartType = 'line';

  public barChartData: ChartData<'line'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [
          -848, -848, -689, -371, 105, 741, 1535, 2488, 3600, 4871, 6300, 7889,
        ],
        label: 'NET CASH',
        fill: 'start',
      },
    ],
  };
}
