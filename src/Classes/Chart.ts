export class Chart {
  async renderChart(chartData: any, symbol: string) {
    let dataCollection: chartData = {
      labels: Array(),
      datasets: [
        {
          // * Make the stock symbols dynamic
          label: symbol,
          data: Array(),
          backgroundColor: ["rgb(255, 99, 132)"],
        },
      ],
    };
    console.log("Bruh");
    console.log("bruh", dataCollection);
    Object.keys(chartData).forEach((stockDate: string) => {
      dataCollection.datasets[0].data.push(chartData[stockDate]["4. close"]);
      dataCollection.labels.push(stockDate);
    });
    return dataCollection;
  }
  chartOptions(): any {
    return {
      responsive: true,
      // Keep it false so it stays as a rectangle
      maintainAspectRatio: false,
    };
  }
}

export interface chartData {
  labels: Array<any>;
  datasets: Array<any>;
}
