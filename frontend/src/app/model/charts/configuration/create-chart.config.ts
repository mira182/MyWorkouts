import Chart from "chart.js/auto";
import {WorkoutChartSettings} from "../../../components/dashboard/dashboard-workouts/dashboard-workouts.component";

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
        data: data,
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
        data: data,
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
        data: data,
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
