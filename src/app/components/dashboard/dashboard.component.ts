import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../constants/issue';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [BaseChartDirective],
})
export class DashboardComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartType = 'pie' as const;

  public pieChartData1: ChartData<'pie'> = {
    labels: ['No Data'],
    datasets: [{ data: [0], label: 'Estados' }],
  };

  public pieChartData2: ChartData<'pie'> = {
    labels: ['No Data'],
    datasets: [{ data: [0], label: 'Categorías' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {},
      y: {
        min: 0,
        max: 20,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    datasets: [{ data: [], label: 'Incidencias por Mes' }],
  };

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.issueService.getIssues().subscribe({
      next: (issues) => this.processIssueData(issues),
      error: (err) => console.error('Error fetching issues', err),
    });
  }

  private processIssueData(issues: Issue[]): void {
    const issuesByMonth = new Array(12).fill(0);
    const issuesByCategory: { [key: string]: number } = {};
    const issuesByStatus: { [key: string]: number } = {};

    issues.forEach((issue) => {
      const createdAt = new Date(issue.createdAt);
      const month = createdAt.getMonth();
      issuesByMonth[month]++;

      if (issuesByCategory[issue.category.name]) {
        issuesByCategory[issue.category.name]++;
      } else {
        issuesByCategory[issue.category.name] = 1;
      }

      if (issuesByStatus[issue.status.name]) {
        issuesByStatus[issue.status.name]++;
      } else {
        issuesByStatus[issue.status.name] = 1;
      }
    });

    this.barChartData.datasets[0].data = issuesByMonth;
    this.pieChartData1.labels = Object.keys(issuesByStatus);
    this.pieChartData1.datasets[0].data = Object.values(issuesByStatus);
    this.pieChartData2.labels = Object.keys(issuesByCategory);
    this.pieChartData2.datasets[0].data = Object.values(issuesByCategory);

    this.charts.forEach((chart) => chart.update());
  }
}
