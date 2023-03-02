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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForms();
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
    const NumberofLeadsOrManagersInOperation = this.resultConsolidatedForm.B16;
    const costOfManager =
      NumberofLeadsOrManagersInOperation * this.resultConsolidatedForm.B17;
    const costOfManagerWithHike =
      costOfManager * (this.resultConsolidatedForm.B18 / 100);
    const NumberofDeliveryFTEInOperation = this.resultConsolidatedForm.B19;
    const costOfFTE =
      NumberofDeliveryFTEInOperation * this.resultConsolidatedForm.B20;
    const costOfFTEWithHike =
      costOfFTE * (this.resultConsolidatedForm.B21 / 100);
    const totalCostOfFTEWithHike = costOfFTE + costOfFTEWithHike;
    const totalCostOfManagerWithHike = costOfManager + costOfManagerWithHike;
    const currentAnnualOperationsCost =
      totalCostOfManagerWithHike + totalCostOfFTEWithHike;

    let numberOfBotsInProductionCurrently = 5;
    let licenseCostPerBotPerYearApprox = 5000;
    let botSupportTeamSize = 5;
    let botSupportTeamAverageFullyLoadedYearlySalary = 5000;
    let botDevTeamSize = 5;
    let botDevTeamAverageFullyLoadedYearlySalary = 5000;
    let yearlyCostOfbots =
      numberOfBotsInProductionCurrently * licenseCostPerBotPerYearApprox;
    let botSupportTeamCosts =
      botSupportTeamSize * botSupportTeamAverageFullyLoadedYearlySalary;
    let rpaDevTeamCosts =
      botDevTeamSize * botDevTeamAverageFullyLoadedYearlySalary;

    let botsAndRPATeam =
      yearlyCostOfbots + botSupportTeamCosts + rpaDevTeamCosts;

    if (this.resultConsolidatedForm.bot === this.botFieldsWithNoValues) {
      numberOfBotsInProductionCurrently = 0;
      licenseCostPerBotPerYearApprox = 0;
      botSupportTeamSize = 0;
      botSupportTeamAverageFullyLoadedYearlySalary = 0;
      botDevTeamSize = 0;
      botDevTeamAverageFullyLoadedYearlySalary = 0;
      yearlyCostOfbots = 0;
      botSupportTeamCosts = 0;
      rpaDevTeamCosts = 0;
      botsAndRPATeam = 0;
    }

    const totalCurrentAnnualOperationCost =
      currentAnnualOperationsCost + botsAndRPATeam;

    const percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_ValueLeakageInCostFromUserInput =
      totalCostOfFTEWithHike * (this.resultConsolidatedForm.B26 / 100);
    const percentOfTimeSpentInReWorkManagement_ValueLeakageInCostFromUserInput =
      totalCostOfFTEWithHike * (this.resultConsolidatedForm.B27 / 100);
    const percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_ValueLeakageInCostFromUserInput =
      totalCostOfFTEWithHike * (this.resultConsolidatedForm.B28 / 100);
    const percentOfTimeSpentDoingRootCauseAnalysisForDeviations_ValueLeakageInCostFromUserInput =
      totalCostOfFTEWithHike * (this.resultConsolidatedForm.B29 / 100);
    const EstimatedExcessCapacityCarriedInOperation_ValueLeakageInCostFromUserInput =
      totalCostOfFTEWithHike * (this.resultConsolidatedForm.B30 / 100);

    const percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_ValueLeakageInCostFromUserInput =
      totalCostOfManagerWithHike + this.resultConsolidatedForm.B33 / 100;
    const percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_ValueLeakageInCostFromUserInput =
      totalCostOfManagerWithHike + this.resultConsolidatedForm.B34 / 100;
    const percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_ValueLeakageInCostFromUserInput =
      totalCostOfManagerWithHike + this.resultConsolidatedForm.B35 / 100;
    const percentOfTimeCapacityManagementOrLoadBalancing_ValueLeakageInCostFromUserInput =
      totalCostOfManagerWithHike + this.resultConsolidatedForm.B36 / 100;

    const totalApproximateFTEResourceTimeDistributionAndApproximateLeadAndManagerTimeDistribution_ValueLeakageInCostFromUserInput =
      percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_ValueLeakageInCostFromUserInput +
      percentOfTimeSpentInReWorkManagement_ValueLeakageInCostFromUserInput +
      percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_ValueLeakageInCostFromUserInput +
      percentOfTimeSpentDoingRootCauseAnalysisForDeviations_ValueLeakageInCostFromUserInput +
      EstimatedExcessCapacityCarriedInOperation_ValueLeakageInCostFromUserInput +
      percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_ValueLeakageInCostFromUserInput +
      percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_ValueLeakageInCostFromUserInput +
      percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_ValueLeakageInCostFromUserInput +
      percentOfTimeCapacityManagementOrLoadBalancing_ValueLeakageInCostFromUserInput;

    const valueLeakageReductionByEnateHuman = {
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

    const valueLeakageReductionByEnateBots = {
      1: 13,
      2: 70,
      3: 70,
      4: 80,
      5: 80,
      6: 60,
      7: 70,
      8: 80,
    };

    const percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_EnateDrivenSavingsInCost =
      percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_ValueLeakageInCostFromUserInput *
      valueLeakageReductionByEnateHuman['1'];
    const percentOfTimeSpentInReWorkManagement_EnateDrivenSavingsInCost =
      percentOfTimeSpentInReWorkManagement_ValueLeakageInCostFromUserInput *
      valueLeakageReductionByEnateHuman['2'];
    const percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_EnateDrivenSavingsInCost =
      percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_ValueLeakageInCostFromUserInput *
      valueLeakageReductionByEnateHuman['3'];
    const percentOfTimeSpentDoingRootCauseAnalysisForDeviations_EnateDrivenSavingsInCost =
      percentOfTimeSpentDoingRootCauseAnalysisForDeviations_ValueLeakageInCostFromUserInput *
      valueLeakageReductionByEnateHuman['4'];
    const EstimatedExcessCapacityCarriedInOperation_EnateDrivenSavingsInCost =
      EstimatedExcessCapacityCarriedInOperation_ValueLeakageInCostFromUserInput *
      valueLeakageReductionByEnateHuman['5'];
    const percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_EnateDrivenSavingsInCost =
      percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_ValueLeakageInCostFromUserInput *
      valueLeakageReductionByEnateHuman['6'];
    const percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_EnateDrivenSavingsInCost =
      percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_ValueLeakageInCostFromUserInput *
      valueLeakageReductionByEnateHuman['7'];
    const percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_EnateDrivenSavingsInCost =
      percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_ValueLeakageInCostFromUserInput *
      valueLeakageReductionByEnateHuman['8'];
    const percentOfTimeCapacityManagementOrLoadBalancing_EnateDrivenSavingsInCost =
      percentOfTimeCapacityManagementOrLoadBalancing_ValueLeakageInCostFromUserInput *
      valueLeakageReductionByEnateHuman['9'];

    const totalApproximateFTEResourceTimeDistributionAndApproximateLeadAndManagerTimeDistribution_EnateDrivenSavingsInCost =
      percentOfTimeSpentInProcessAndSOPsToEnsureFirstTimeCorrectness_EnateDrivenSavingsInCost +
      percentOfTimeSpentInReWorkManagement_EnateDrivenSavingsInCost +
      percentOfEffortSpentTrackingAndManagingContinuityBetweenActivities_EnateDrivenSavingsInCost +
      percentOfTimeSpentDoingRootCauseAnalysisForDeviations_EnateDrivenSavingsInCost +
      EstimatedExcessCapacityCarriedInOperation_EnateDrivenSavingsInCost +
      percentOfTimeSpentInMailBoxManagementAndWorkAllocationToTeam_EnateDrivenSavingsInCost +
      percentOfTimeSpentCreatingReportsAndCollatingMIAcrossOperation_EnateDrivenSavingsInCost +
      percentOfTimeSpentPrioritisingWorkManagingEscalationsAndSLAMgmt_EnateDrivenSavingsInCost +
      percentOfTimeCapacityManagementOrLoadBalancing_EnateDrivenSavingsInCost;

    const hybridWorkforceTierAmountPerUserPerMonth = 65;
    const humanStaff_EnateRecurringCost =
      hybridWorkforceTierAmountPerUserPerMonth *
      12 *
      (NumberofLeadsOrManagersInOperation + NumberofDeliveryFTEInOperation);

    const humanStaff_NetOngoingSavings =
      totalApproximateFTEResourceTimeDistributionAndApproximateLeadAndManagerTimeDistribution_EnateDrivenSavingsInCost -
      humanStaff_EnateRecurringCost;

    const currentRobotUtilisationPercent_ValueLeakageInCostFromUserInput =
      (100 % -(this.resultConsolidatedForm.bot['H26'] / 100)) *
      yearlyCostOfbots;
    const teamsTimeSpentOnRcasWhenIssuesOccur_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H27'] / 100) * botSupportTeamCosts;
    const teamsTimeSpentForRecoveryActionsAndReExecutionSetup_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H28'] / 100) * botSupportTeamCosts;
    const teamsTimeSpentConsolidatingReportsForBots_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H29'] / 100) * botSupportTeamCosts;
    const timeSpentOnSupportingBusinessCommunicationsAndUpdates_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H30'] / 100) * botSupportTeamCosts;

    const botRuntimeOrProductionMetrics_totalValueLeakageInCostFromUserInput =
      currentRobotUtilisationPercent_ValueLeakageInCostFromUserInput +
      teamsTimeSpentOnRcasWhenIssuesOccur_ValueLeakageInCostFromUserInput +
      teamsTimeSpentForRecoveryActionsAndReExecutionSetup_ValueLeakageInCostFromUserInput +
      teamsTimeSpentConsolidatingReportsForBots_ValueLeakageInCostFromUserInput +
      timeSpentOnSupportingBusinessCommunicationsAndUpdates_ValueLeakageInCostFromUserInput;

    const avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H33'] / 100) * rpaDevTeamCosts;
    const avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H34'] / 100) * rpaDevTeamCosts;
    const avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_ValueLeakageInCostFromUserInput =
      (this.resultConsolidatedForm.bot['H35'] / 100) * rpaDevTeamCosts;

    const botDevelopmentOrManagementMetrics_totalValueLeakageInCostFromUserInput =
      avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_ValueLeakageInCostFromUserInput +
      avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_ValueLeakageInCostFromUserInput +
      avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_ValueLeakageInCostFromUserInput;

    const currentRobotUtilisationPercent_EnateDrivenSavingsInCost =
      (valueLeakageReductionByEnateBots['1'] / 100 -
        this.resultConsolidatedForm.bot['H26'] / 100) *
      yearlyCostOfbots;
    const teamsTimeSpentOnRcasWhenIssuesOccur_EnateDrivenSavingsInCost =
      (valueLeakageReductionByEnateBots['2'] / 100) *
      teamsTimeSpentOnRcasWhenIssuesOccur_ValueLeakageInCostFromUserInput;
    const teamsTimeSpentForRecoveryActionsAndReExecutionSetup_EnateDrivenSavingsInCost =
      (valueLeakageReductionByEnateBots['3'] / 100) *
      teamsTimeSpentForRecoveryActionsAndReExecutionSetup_ValueLeakageInCostFromUserInput;
    const teamsTimeSpentConsolidatingReportsForBots_EnateDrivenSavingsInCost =
      (valueLeakageReductionByEnateBots['4'] / 100) *
      teamsTimeSpentConsolidatingReportsForBots_ValueLeakageInCostFromUserInput;
    const timeSpentOnSupportingBusinessCommunicationsAndUpdates_EnateDrivenSavingsInCost =
      (valueLeakageReductionByEnateBots['5'] / 100) *
      timeSpentOnSupportingBusinessCommunicationsAndUpdates_ValueLeakageInCostFromUserInput;

    const botRuntimeOrProductionMetrics_totalEnateDrivenSavingsInCost =
      currentRobotUtilisationPercent_EnateDrivenSavingsInCost +
      teamsTimeSpentOnRcasWhenIssuesOccur_EnateDrivenSavingsInCost +
      teamsTimeSpentForRecoveryActionsAndReExecutionSetup_EnateDrivenSavingsInCost +
      teamsTimeSpentConsolidatingReportsForBots_EnateDrivenSavingsInCost +
      timeSpentOnSupportingBusinessCommunicationsAndUpdates_EnateDrivenSavingsInCost;

    const avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_EnateDrivenSavingsInCost =
      (valueLeakageReductionByEnateBots['6'] / 100) *
      avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_ValueLeakageInCostFromUserInput;
    const avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_EnateDrivenSavingsInCost =
      (valueLeakageReductionByEnateBots['7'] / 100) *
      avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_ValueLeakageInCostFromUserInput;
    const avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_EnateDrivenSavingsInCost =
      (valueLeakageReductionByEnateBots['8'] / 100) *
      avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_ValueLeakageInCostFromUserInput;

    const botDevelopmentOrManagementMetrics_totalEnateDrivenSavingsInCosts =
      avgPercentOfDevelopmentTeamsTimeSpentOnPlanning_EnateDrivenSavingsInCost +
      avgPercentOfDevelopmentTeamsTimeSpentOnExceptionHandling_EnateDrivenSavingsInCost +
      avgPercentOfDevelopmentTeamsTimeSpentOnHandingOffCode_EnateDrivenSavingsInCost;

    const botPlusRpaTeamEnateBasedSaving =
      botRuntimeOrProductionMetrics_totalEnateDrivenSavingsInCost +
      botDevelopmentOrManagementMetrics_totalEnateDrivenSavingsInCosts;

    const botPlusRpaTeamEnateRecurringCost =
      12 *
      hybridWorkforceTierAmountPerUserPerMonth *
      numberOfBotsInProductionCurrently;

    const botPlusRpaTeamNetOngoingSavings =
      botPlusRpaTeamEnateBasedSaving - botPlusRpaTeamEnateRecurringCost;
    const totalNetOngoingSavings =
      humanStaff_NetOngoingSavings + botPlusRpaTeamNetOngoingSavings;

    const projectedAnnualOperationsCost =
      totalCurrentAnnualOperationCost - totalNetOngoingSavings;

    this.roiSummaryForm.patchValue({
      currentAnnualOperationsCost: currentAnnualOperationsCost,
      projectedAnnualOperationsCost: projectedAnnualOperationsCost,
      // savingsPercentOfCurrentCost: ,
      // enateAnnualCost: ,
      // annualNetSavings: ,
      // estimatedEffortOptimizationOfTeamLead: ,
      // estimatedEffortOptimizationOfFte: ,
      // enateCostOneOffSetup:
    });
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
