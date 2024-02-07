import Chart from "chart.js/auto";

export const updateChartJsDataset = (chart: Chart, data: number[]) => {
  chart.data.datasets[0].data = data;
}

export const createBreakdownChartConfig = (labels: string[], data: number[]) => {
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
