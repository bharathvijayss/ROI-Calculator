import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  botFieldsWithValues = {
    H26: 30,
    H27: 10,
    H28: 10,
    H29: 10,
    H30: 10,
    H33: 10,
    H34: 10,
    H35: 10,
  };
  botFieldsWithNoValues = {
    H26: 0,
    H27: 0,
    H28: 0,
    H29: 0,
    H30: 0,
    H33: 0,
    H34: 0,
    H35: 0,
  };
  radioOptions: string[] = ['Yes', 'No'];
  min = 5;
  max = 30;
  step = 5;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

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
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
  ];
  public barChartType: ChartType = 'line';
  public barChartData: ChartData<'line'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [
          -848, -848, -689, -371, 105, 741, 1535, 2488, 3600, 4871, 6300, 7889,
          8435, 8566, 9453, 9566, 10002, 10235, 11243, 15932, 18342, 19453,
          20345, 24523,
        ],
        label: 'NET CASH',
        fill: 'start',
      },
    ],
  };

  NumberofLeadsOrManagersInOperation: any;
  costOfManager: any;
  costOfManagerWithHike: any;
  NumberofDeliveryFTEInOperation: any;
  costOfFTE: any;
  costOfFTEWithHike: any;
  totalCostOfFTEWithHike: any;
  totalCostOfManagerWithHike: any;
  currentAnnualOperationsCost: any;
  projectedAnnualOperationsCost: any;
  numberOfBotsInProductionCurrently: any;
  licenseCostPerBotPerYearApprox: any;
  botSupportTeamSize: any;
  botSupportTeamAverageFullyLoadedYearlySalary: any;
  botDevTeamSize: any;
  botDevTeamAverageFullyLoadedYearlySalary: any;
  yearlyCostOfbots: any;
  botSupportTeamCosts: any;
  rpaDevTeamCosts: any;
  botsAndRPATeam: any;
  valueLeakageReductionByEnateHuman = {
    1: 70,
    2: 25,
    3: 70,
    4: 70,
    5: 50,
    6: 60,
    7: 80,
    8: 70,
    9: 60,
  };
  valueLeakageReductionByEnateBots = {
    1: 13,
    2: 70,
    3: 70,
    4: 80,
    5: 80,
    6: 60,
    7: 70,
    8: 80,
  };
  totalCurrentAnnualOperationCost: any;
  totalNetOngoingSavings: any;
  percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_ValueLeakageInCostFromUserInput: any;
  percentOfTimeSpentInReWorkManagement_ValueLeakageInCostFromUserInput: any;
  percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_ValueLeakageInCostFromUserInput: any;
  percentOfTimeSpentDoingRootCauseAnalysisForDeviations_ValueLeakageInCostFromUserInput: any;
  EstimatedExcessCapacityCarriedInOperation_ValueLeakageInCostFromUserInput: any;
  percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_ValueLeakageInCostFromUserInput: any;
  percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_ValueLeakageInCostFromUserInput: any;
  percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_ValueLeakageInCostFromUserInput: any;
  percentOfTimeCapacityManagementOrLoadBalancing_ValueLeakageInCostFromUserInput: any;
  totalApproximateFTEResourceTimeDistributionAndApproximateLeadAndManagerTimeDistribution_ValueLeakageInCostFromUserInput: any;
  percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_EnateDrivenSavingsInCost: any;
  percentOfTimeSpentInReWorkManagement_EnateDrivenSavingsInCost: any;
  percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_EnateDrivenSavingsInCost: any;
  percentOfTimeSpentDoingRootCauseAnalysisForDeviations_EnateDrivenSavingsInCost: any;
  EstimatedExcessCapacityCarriedInOperation_EnateDrivenSavingsInCost: any;
  percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_EnateDrivenSavingsInCost: any;
  percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_EnateDrivenSavingsInCost: any;
  percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_EnateDrivenSavingsInCost: any;
  percentOfTimeCapacityManagementOrLoadBalancing_EnateDrivenSavingsInCost: any;
  totalApproximateFTEResourceTimeDistributionAndApproximateLeadAndManagerTimeDistribution_EnateDrivenSavingsInCost: any;
  hybridWorkforceTierAmountPerUserPerMonth = 65;
  humanStaff_EnateRecurringCost: any;
  humanStaff_NetOngoingSavings: any;
  currentRobotUtilisationPercent_ValueLeakageInCostFromUserInput: any;
  teamsTimeSpentOnRcasWhenIssuesOccur_ValueLeakageInCostFromUserInput: any;
  teamsTimeSpentForRecoveryActionsAndReExecutionSetup_ValueLeakageInCostFromUserInput: any;
  teamsTimeSpentConsolidatingReportsForBots_ValueLeakageInCostFromUserInput: any;
  timeSpentOnSupportingBusinessCommunicationsAndUpdates_ValueLeakageInCostFromUserInput: any;
  botRuntimeOrProductionMetrics_totalValueLeakageInCostFromUserInput: any;
  avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_ValueLeakageInCostFromUserInput: any;
  avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_ValueLeakageInCostFromUserInput: any;
  avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_ValueLeakageInCostFromUserInput: any;
  botDevelopmentOrManagementMetrics_totalValueLeakageInCostFromUserInput: any;
  currentRobotUtilisationPercent_EnateDrivenSavingsInCost: any;
  teamsTimeSpentOnRcasWhenIssuesOccur_EnateDrivenSavingsInCost: any;
  teamsTimeSpentForRecoveryActionsAndReExecutionSetup_EnateDrivenSavingsInCost: any;
  teamsTimeSpentConsolidatingReportsForBots_EnateDrivenSavingsInCost: any;
  timeSpentOnSupportingBusinessCommunicationsAndUpdates_EnateDrivenSavingsInCost: any;
  botRuntimeOrProductionMetrics_totalEnateDrivenSavingsInCost: any;
  avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_EnateDrivenSavingsInCost: any;
  avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_EnateDrivenSavingsInCost: any;
  avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_EnateDrivenSavingsInCost: any;
  botDevelopmentOrManagementMetrics_totalEnateDrivenSavingsInCosts: any;
  botPlusRpaTeamEnateBasedSaving: any;
  botPlusRpaTeamEnateRecurringCost: any;
  botPlusRpaTeamNetOngoingSavings: any;
  savingsPercentOfCurrentCost: any;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.personalDetailsForm = this._formBuilder.group({
      firstName: ['bvv', [Validators.required, Validators.minLength(3)]],
      lastName: ['bvv', [Validators.required, Validators.minLength(3)]],
      email: ['vbvv@sfs.com', [Validators.required, Validators.email]],
    });
    this.costInputForm1 = this._formBuilder.group({
      B16: [100, Validators.required],
      B17: [120000, Validators.required],
    });
    this.costInputForm2 = this._formBuilder.group({
      B19: [1000, Validators.required],
      B20: [85000, Validators.required],
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

  processFormValues() {
    this.resultConsolidatedForm = {
      ...this.resultConsolidatedForm,
      firstName: this.personalDetailsForm.controls.firstName.value,
      lastName: this.personalDetailsForm.controls.lastName.value,
      email: this.personalDetailsForm.controls.email.value,
      B16: this.costInputForm1.controls.B16.value,
      B17: this.costInputForm1.controls.B17.value,
      B19: this.costInputForm2.controls.B19.value,
      B20: this.costInputForm2.controls.B20.value,
      B26:
        this.ManagerResourceTDForm1.controls.B26.value === 'Yes'
          ? 25
          : this.ManagerResourceTDForm1.controls.B26.value === 'No'
          ? 0
          : null,
      B27:
        this.ManagerResourceTDForm2.controls.B27.value === 'Yes'
          ? 10
          : this.ManagerResourceTDForm2.controls.B27.value === 'No'
          ? 0
          : null,
      B30: this.ManagerResourceTDForm3.controls.B30.value,
      B33:
        this.ManagersTimeDistributionForm1.controls.B33.value === 'Yes'
          ? 20
          : this.ManagersTimeDistributionForm1.controls.B33.value === 'No'
          ? 0
          : null,
      B34:
        this.ManagersTimeDistributionForm2.controls.B34.value === 'Yes'
          ? 10
          : this.ManagersTimeDistributionForm2.controls.B34.value === 'No'
          ? 0
          : null,
      bot:
        this.botForm.controls.botUsage.value === 'No'
          ? this.botFieldsWithNoValues
          : this.botForm.controls.botUsage.value === null
          ? null
          : this.botFieldsWithValues,
    };
  }

  //Need to fix this method.
  CalculateROI() {
    this.processFormValues();
    // this.initBarChartLabelsAndData();
    this.roiSummaryForm.controls.rolloutPeriod.disable();
    this.roiSummaryForm.controls.lagFromLicensesToSavings.disable();
    this.calculateAndUpdateROIForm();
  }

  //Need to fix this method.
  calculateAndUpdateROIForm() {
    //Current Operations Cost Annual
    this.calculateCurrentOperationsAnnualCost();

    //Projected Operations Cost Annaul
    this.calculateProjectedOperationsAnnualCost();

    //Savings % of Current Cost
    this.calculateSavingsPercentOfCurrentCost();

    this.roiSummaryForm.patchValue({
      currentAnnualOperationsCost: this.currentAnnualOperationsCost,
      projectedAnnualOperationsCost: this.projectedAnnualOperationsCost,
      savingsPercentOfCurrentCost: this.savingsPercentOfCurrentCost,
      // enateAnnualCost: ,
      // annualNetSavings: ,
      // estimatedEffortOptimizationOfTeamLead: ,
      // estimatedEffortOptimizationOfFte: ,
      // enateCostOneOffSetup:
    });
  }

  calculateCurrentOperationsAnnualCost() {
    this.NumberofLeadsOrManagersInOperation = this.resultConsolidatedForm.B16;
    this.costOfManager =
      this.NumberofLeadsOrManagersInOperation * this.resultConsolidatedForm.B17;
    this.costOfManagerWithHike =
      this.costOfManager * (this.resultConsolidatedForm.B18 / 100);
    this.NumberofDeliveryFTEInOperation = this.resultConsolidatedForm.B19;
    this.costOfFTE =
      this.NumberofDeliveryFTEInOperation * this.resultConsolidatedForm.B20;
    this.costOfFTEWithHike =
      this.costOfFTE * (this.resultConsolidatedForm.B21 / 100);
    this.totalCostOfFTEWithHike = this.costOfFTE + this.costOfFTEWithHike;
    this.totalCostOfManagerWithHike =
      this.costOfManager + this.costOfManagerWithHike;
    this.currentAnnualOperationsCost =
      this.totalCostOfManagerWithHike + this.totalCostOfFTEWithHike;
  }

  calculateProjectedOperationsAnnualCost() {
    this.calculateCurrentCostOfRpaTeam();
    this.calculateCurrentCostHumanWorkForce();

    this.humanStaff_EnateRecurringCost =
      this.hybridWorkforceTierAmountPerUserPerMonth *
      12 *
      (this.NumberofLeadsOrManagersInOperation +
        this.NumberofDeliveryFTEInOperation);

    this.humanStaff_NetOngoingSavings =
      this
        .totalApproximateFTEResourceTimeDistributionAndApproximateLeadAndManagerTimeDistribution_EnateDrivenSavingsInCost -
      this.humanStaff_EnateRecurringCost;

    this.totalNetOngoingSavings =
      this.humanStaff_NetOngoingSavings + this.botPlusRpaTeamNetOngoingSavings;

    this.projectedAnnualOperationsCost =
      this.totalCurrentAnnualOperationCost - this.totalNetOngoingSavings;
  }

  calculateCurrentCostOfRpaTeam() {
    if (this.resultConsolidatedForm.bot === this.botFieldsWithNoValues) {
      this.numberOfBotsInProductionCurrently = 0;
      this.botSupportTeamSize = 0;
      this.botDevTeamSize = 0;
    } else {
      this.numberOfBotsInProductionCurrently = 5;
      this.botSupportTeamSize = 5;
      this.botDevTeamSize = 5;
    }

    this.licenseCostPerBotPerYearApprox = 5000;
    this.botSupportTeamAverageFullyLoadedYearlySalary = 5000;
    this.botDevTeamAverageFullyLoadedYearlySalary = 5000;

    this.yearlyCostOfbots =
      this.numberOfBotsInProductionCurrently *
      this.licenseCostPerBotPerYearApprox;
    this.botSupportTeamCosts =
      this.botSupportTeamSize *
      this.botSupportTeamAverageFullyLoadedYearlySalary;
    this.rpaDevTeamCosts =
      this.botDevTeamSize * this.botDevTeamAverageFullyLoadedYearlySalary;
    this.botsAndRPATeam =
      this.yearlyCostOfbots + this.botSupportTeamCosts + this.rpaDevTeamCosts;

    this.currentRobotUtilisationPercent_ValueLeakageInCostFromUserInput =
      (100 % -(this.resultConsolidatedForm.bot['H26'] / 100)) *
      this.yearlyCostOfbots;
    this.teamsTimeSpentOnRcasWhenIssuesOccur_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H27'] / 100) * this.botSupportTeamCosts;
    this.teamsTimeSpentForRecoveryActionsAndReExecutionSetup_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H28'] / 100) * this.botSupportTeamCosts;
    this.teamsTimeSpentConsolidatingReportsForBots_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H29'] / 100) * this.botSupportTeamCosts;
    this.timeSpentOnSupportingBusinessCommunicationsAndUpdates_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H30'] / 100) * this.botSupportTeamCosts;

    this.botRuntimeOrProductionMetrics_totalValueLeakageInCostFromUserInput =
      this.currentRobotUtilisationPercent_ValueLeakageInCostFromUserInput +
      this.teamsTimeSpentOnRcasWhenIssuesOccur_ValueLeakageInCostFromUserInput +
      this
        .teamsTimeSpentForRecoveryActionsAndReExecutionSetup_ValueLeakageInCostFromUserInput +
      this
        .teamsTimeSpentConsolidatingReportsForBots_ValueLeakageInCostFromUserInput +
      this
        .timeSpentOnSupportingBusinessCommunicationsAndUpdates_ValueLeakageInCostFromUserInput;

    this.avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H33'] / 100) * this.rpaDevTeamCosts;
    this.avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H34'] / 100) * this.rpaDevTeamCosts;
    this.avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H35'] / 100) * this.rpaDevTeamCosts;

    this.botDevelopmentOrManagementMetrics_totalValueLeakageInCostFromUserInput =
      this
        .avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_ValueLeakageInCostFromUserInput +
      this
        .avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_ValueLeakageInCostFromUserInput +
      this
        .avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_ValueLeakageInCostFromUserInput;

    this.currentRobotUtilisationPercent_EnateDrivenSavingsInCost =
      (this.valueLeakageReductionByEnateBots['1'] / 100 -
        this.resultConsolidatedForm.bot['H26'] / 100) *
      this.yearlyCostOfbots;
    this.teamsTimeSpentOnRcasWhenIssuesOccur_EnateDrivenSavingsInCost =
      (this.valueLeakageReductionByEnateBots['2'] / 100) *
      this.teamsTimeSpentOnRcasWhenIssuesOccur_ValueLeakageInCostFromUserInput;
    this.teamsTimeSpentForRecoveryActionsAndReExecutionSetup_EnateDrivenSavingsInCost =
      (this.valueLeakageReductionByEnateBots['3'] / 100) *
      this
        .teamsTimeSpentForRecoveryActionsAndReExecutionSetup_ValueLeakageInCostFromUserInput;
    this.teamsTimeSpentConsolidatingReportsForBots_EnateDrivenSavingsInCost =
      (this.valueLeakageReductionByEnateBots['4'] / 100) *
      this
        .teamsTimeSpentConsolidatingReportsForBots_ValueLeakageInCostFromUserInput;
    this.timeSpentOnSupportingBusinessCommunicationsAndUpdates_EnateDrivenSavingsInCost =
      (this.valueLeakageReductionByEnateBots['5'] / 100) *
      this
        .timeSpentOnSupportingBusinessCommunicationsAndUpdates_ValueLeakageInCostFromUserInput;

    this.botRuntimeOrProductionMetrics_totalEnateDrivenSavingsInCost =
      this.currentRobotUtilisationPercent_EnateDrivenSavingsInCost +
      this.teamsTimeSpentOnRcasWhenIssuesOccur_EnateDrivenSavingsInCost +
      this
        .teamsTimeSpentForRecoveryActionsAndReExecutionSetup_EnateDrivenSavingsInCost +
      this.teamsTimeSpentConsolidatingReportsForBots_EnateDrivenSavingsInCost +
      this
        .timeSpentOnSupportingBusinessCommunicationsAndUpdates_EnateDrivenSavingsInCost;

    this.avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_EnateDrivenSavingsInCost =
      (this.valueLeakageReductionByEnateBots['6'] / 100) *
      this
        .avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_ValueLeakageInCostFromUserInput;
    this.avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_EnateDrivenSavingsInCost =
      (this.valueLeakageReductionByEnateBots['7'] / 100) *
      this
        .avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_ValueLeakageInCostFromUserInput;
    this.avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_EnateDrivenSavingsInCost =
      (this.valueLeakageReductionByEnateBots['8'] / 100) *
      this
        .avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_ValueLeakageInCostFromUserInput;

    this.botDevelopmentOrManagementMetrics_totalEnateDrivenSavingsInCosts =
      this
        .avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_EnateDrivenSavingsInCost +
      this
        .avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_EnateDrivenSavingsInCost +
      this
        .avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_EnateDrivenSavingsInCost;

    this.botPlusRpaTeamEnateBasedSaving =
      this.botRuntimeOrProductionMetrics_totalEnateDrivenSavingsInCost +
      this.botDevelopmentOrManagementMetrics_totalEnateDrivenSavingsInCosts;

    this.botPlusRpaTeamEnateRecurringCost =
      12 *
      this.hybridWorkforceTierAmountPerUserPerMonth *
      this.numberOfBotsInProductionCurrently;

    this.botPlusRpaTeamNetOngoingSavings =
      this.botPlusRpaTeamEnateBasedSaving -
      this.botPlusRpaTeamEnateRecurringCost;
  }

  calculateCurrentCostHumanWorkForce() {
    this.totalCurrentAnnualOperationCost =
      this.currentAnnualOperationsCost + this.botsAndRPATeam;

    this.percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_ValueLeakageInCostFromUserInput =
      Math.round(
        this.totalCostOfFTEWithHike * (this.resultConsolidatedForm.B26 / 100)
      );
    this.percentOfTimeSpentInReWorkManagement_ValueLeakageInCostFromUserInput =
      Math.round(
        this.totalCostOfFTEWithHike * (this.resultConsolidatedForm.B27 / 100)
      );
    this.percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_ValueLeakageInCostFromUserInput =
      Math.round(
        this.totalCostOfFTEWithHike * (this.resultConsolidatedForm.B28 / 100)
      );
    this.percentOfTimeSpentDoingRootCauseAnalysisForDeviations_ValueLeakageInCostFromUserInput =
      Math.round(
        this.totalCostOfFTEWithHike * (this.resultConsolidatedForm.B29 / 100)
      );
    this.EstimatedExcessCapacityCarriedInOperation_ValueLeakageInCostFromUserInput =
      Math.round(
        this.totalCostOfFTEWithHike * (this.resultConsolidatedForm.B30 / 100)
      );

    this.percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_ValueLeakageInCostFromUserInput =
      Math.round(
        this.totalCostOfManagerWithHike *
          (this.resultConsolidatedForm.B33 / 100)
      );
    this.percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_ValueLeakageInCostFromUserInput =
      Math.round(
        this.totalCostOfManagerWithHike *
          (this.resultConsolidatedForm.B34 / 100)
      );
    this.percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_ValueLeakageInCostFromUserInput =
      Math.round(
        this.totalCostOfManagerWithHike *
          (this.resultConsolidatedForm.B35 / 100)
      );
    this.percentOfTimeCapacityManagementOrLoadBalancing_ValueLeakageInCostFromUserInput =
      Math.round(
        this.totalCostOfManagerWithHike *
          (this.resultConsolidatedForm.B36 / 100)
      );

    this.totalApproximateFTEResourceTimeDistributionAndApproximateLeadAndManagerTimeDistribution_ValueLeakageInCostFromUserInput =
      this
        .percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_ValueLeakageInCostFromUserInput +
      this
        .percentOfTimeSpentInReWorkManagement_ValueLeakageInCostFromUserInput +
      this
        .percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_ValueLeakageInCostFromUserInput +
      this
        .percentOfTimeSpentDoingRootCauseAnalysisForDeviations_ValueLeakageInCostFromUserInput +
      this
        .EstimatedExcessCapacityCarriedInOperation_ValueLeakageInCostFromUserInput +
      this
        .percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_ValueLeakageInCostFromUserInput +
      this
        .percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_ValueLeakageInCostFromUserInput +
      this
        .percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_ValueLeakageInCostFromUserInput +
      this
        .percentOfTimeCapacityManagementOrLoadBalancing_ValueLeakageInCostFromUserInput;

    this.percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_EnateDrivenSavingsInCost =
      Math.round(
        this
          .percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_ValueLeakageInCostFromUserInput *
          (this.valueLeakageReductionByEnateHuman['1'] / 100)
      );
    this.percentOfTimeSpentInReWorkManagement_EnateDrivenSavingsInCost =
      Math.round(
        this
          .percentOfTimeSpentInReWorkManagement_ValueLeakageInCostFromUserInput *
          (this.valueLeakageReductionByEnateHuman['2'] / 100)
      );
    this.percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_EnateDrivenSavingsInCost =
      Math.round(
        this
          .percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_ValueLeakageInCostFromUserInput *
          (this.valueLeakageReductionByEnateHuman['3'] / 100)
      );
    this.percentOfTimeSpentDoingRootCauseAnalysisForDeviations_EnateDrivenSavingsInCost =
      Math.round(
        this
          .percentOfTimeSpentDoingRootCauseAnalysisForDeviations_ValueLeakageInCostFromUserInput *
          (this.valueLeakageReductionByEnateHuman['4'] / 100)
      );
    this.EstimatedExcessCapacityCarriedInOperation_EnateDrivenSavingsInCost =
      Math.round(
        this
          .EstimatedExcessCapacityCarriedInOperation_ValueLeakageInCostFromUserInput *
          (this.valueLeakageReductionByEnateHuman['5'] / 100)
      );
    this.percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_EnateDrivenSavingsInCost =
      Math.round(
        this
          .percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_ValueLeakageInCostFromUserInput *
          (this.valueLeakageReductionByEnateHuman['6'] / 100)
      );
    this.percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_EnateDrivenSavingsInCost =
      Math.round(
        this
          .percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_ValueLeakageInCostFromUserInput *
          (this.valueLeakageReductionByEnateHuman['7'] / 100)
      );
    this.percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_EnateDrivenSavingsInCost =
      Math.round(
        this
          .percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_ValueLeakageInCostFromUserInput *
          (this.valueLeakageReductionByEnateHuman['8'] / 100)
      );
    this.percentOfTimeCapacityManagementOrLoadBalancing_EnateDrivenSavingsInCost =
      Math.round(
        this
          .percentOfTimeCapacityManagementOrLoadBalancing_ValueLeakageInCostFromUserInput *
          (this.valueLeakageReductionByEnateHuman['9'] / 100)
      );

    this.totalApproximateFTEResourceTimeDistributionAndApproximateLeadAndManagerTimeDistribution_EnateDrivenSavingsInCost =
      this
        .percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_EnateDrivenSavingsInCost +
      this.percentOfTimeSpentInReWorkManagement_EnateDrivenSavingsInCost +
      this
        .percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_EnateDrivenSavingsInCost +
      this
        .percentOfTimeSpentDoingRootCauseAnalysisForDeviations_EnateDrivenSavingsInCost +
      this.EstimatedExcessCapacityCarriedInOperation_EnateDrivenSavingsInCost +
      this
        .percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_EnateDrivenSavingsInCost +
      this
        .percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_EnateDrivenSavingsInCost +
      this
        .percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_EnateDrivenSavingsInCost +
      this
        .percentOfTimeCapacityManagementOrLoadBalancing_EnateDrivenSavingsInCost;
  }

  calculateSavingsPercentOfCurrentCost() {
    this.savingsPercentOfCurrentCost = (
      (this.totalNetOngoingSavings / this.totalCurrentAnnualOperationCost) *
      100
    ).toFixed(2);
  }

  //Need to fix this method.
  // initBarChartLabelsAndData() {
  //   for (
  //     let i = 1;
  //     i <= this.roiSummaryForm.controls.rolloutPeriod.value;
  //     i++
  //   ) {
  //     this.barChartLabels.push(i.toString());
  //   }
  //   this.barChartData.datasets[0].data = [
  //     -848, -848, -689, -371, 105, 741, 1535, 2488, 3600, 4871, 6300, 7889,
  //     8435, 8566, 9453, 9566, 10002, 10235, 11243, 15932, 18342, 19453, 20345,
  //     24523,
  //   ];
  //   console.log(this.barChartLabels);
  //   console.log(this.barChartData);
  // }
}
