import Chart from "chart.js/auto";
import {WorkoutChartSettings} from "../../../components/dashboard/dashboard-workouts/dashboard-workouts.component";

const BRAND_PRIMARY = '#f4511e';
const BRAND_PRIMARY_FILL = 'rgba(244, 81, 30, 0.75)';
const BRAND_PRIMARY_SOFT = 'rgba(244, 81, 30, 0.12)';

const CHART_PALETTE = ['#f4511e', '#1e88e5', '#c87f0a', '#26a69a', '#ab47bc', '#689f38'];

const barDataset = (data: number[]) => ({
  data,
  backgroundColor: BRAND_PRIMARY_FILL,
  hoverBackgroundColor: BRAND_PRIMARY,
  borderRadius: 4,
  borderSkipped: 'start' as const,
  maxBarThickness: 24,
});

const lineDataset = (data: number[]) => ({
  data,
  borderColor: BRAND_PRIMARY,
  backgroundColor: BRAND_PRIMARY_SOFT,
  pointBackgroundColor: BRAND_PRIMARY,
  pointRadius: 4,
  pointHoverRadius: 6,
  borderWidth: 2,
  tension: 0.3,
  fill: true,
});

const singleSeriesDataset = (chartType: string, data: number[]) =>
  chartType === 'line' ? lineDataset(data) : barDataset(data);

export const updateChartJsDataset = (chart: Chart, data: number[]) => {
  chart.data.datasets[0].data = data;
}

export const createChartConfig = (labels: string[], data: number[]) => {
   return new Chart('breakdown', {
    type: 'pie',
    data:   {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: CHART_PALETTE,
        borderWidth: 0,
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        }
      }]
    },
     options: {
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return context.dataset.label;
            }
          }
        }
      }
     }
  });
}

export const createWorkoutChartConfig = (labels: string[], data: number[], settings: WorkoutChartSettings) => {
  return new Chart('workoutChart', {
    type: settings.chartType,
    data: {
      labels: labels,
      datasets: [{
        ...singleSeriesDataset(settings.chartType, data),
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        },
      }]
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: (label) => `${label} ${settings.axisYsuffix}`,
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return context.dataset.label;
            }
          }
        }
      }
    }
  });
}

export const createExerciseChartConfig = (labels: string[], data: number[], settings: WorkoutChartSettings) => {
  return new Chart('workoutChart', {
    type: settings.chartType,
    data: {
      labels: labels,
      datasets: [{
        ...singleSeriesDataset(settings.chartType, data),
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        },
      }]
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: (label) => `${label} ${settings.axisYsuffix}`,
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return context.dataset.label;
            }
          }
        }
      }
    }
  });
}

export const createWorkoutExerciseChartConfig = (labels: string[], data: number[], settings: WorkoutChartSettings) => {
  return new Chart('workoutExerciseChart', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        ...lineDataset(data),
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        },
      }]
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: (label) => `${label} ${settings.axisYsuffix}`,
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return context.dataset.label;
            }
          }
        }
      }
    }
  });
}
