export class Chart {
    // 
    // loaded: Boolean;
    // constructor(loaded: Boolean) {
    //     this.loaded = loaded
    // }
    renderChart(chartData: any, symbol: string) {
        let dataCollection: chartDataInter = {
            labels: Array(),
            datasets: [
                {
                    // * Make the stock symbols dynamic
                    label: symbol,
                    data: Array(),
                    backgroundColor: ["rgb(255, 99, 132)"]
                }
            ]
        };
        Object.keys(chartData).forEach((stockDate: string) => {
            dataCollection.datasets[0].data.push(chartData[stockDate]["4. close"]);
            dataCollection.labels.push(stockDate);
        });
        console.log(dataCollection);
        return dataCollection
    }
    chartOptions(): any {
        return {
            responsive: true,
            // Keep it false so it stays as a rectangle
            maintainAspectRatio: false
        };
    }
}

interface chartDataInter {
    labels: Array<any>;
    datasets: Array<any>;
}