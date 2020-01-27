import express, { Application } from 'express';
import { DoubleLine } from './models/DoubleLine';
import { PieData } from './models/PieData';

const bodyparser = require('body-parser');
const app: Application = express();
app.use(bodyparser.json());
app.use(bodyparser.text());

const text2png = require('text2png');
const fs = require('fs');

const chartExporter = require("highcharts-export-server");
// Initialize the exporter
chartExporter.initPool();

app.post('/textimage', async (req: any, res: any) => {

    const inputText = req.body;

    if (!inputText || JSON.stringify(inputText) === JSON.stringify({})) {
        res.status(500).send('Internal Error or Wrong Input');
    } else {
        const options = {
            font: '32px Futura',
            color: 'teal',
            backgroundColor: 'linen',
            lineSpacing: 30,
            padding: 5,
            output: 'dataURL'
        }

        const base64Image = text2png(inputText, options);
        delete options.output;

        console.log(text2png(inputText, options))
        fs.writeFileSync('./images/textImage.png', text2png(inputText, options));

        res.status(200).send(base64Image);
    }
});

app.post('/doublelinechart', async (req: any, res1: any) => {
    let lineData = {} as DoubleLine;
    lineData = req.body;
    if (!lineData || lineData == null || JSON.stringify(lineData) === JSON.stringify({})) {
        return res1.status(500).send("Data is null or wrong!");
    }

    const chartDetails = {
        type: "png", options: {
            colors: [{
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, '#baeffc'], [1, '#32aedc']]
            }, {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, '#ffcf47'], [1, '#ea30bb']]
            }],
            chart: { type: 'areaspline', width: 621, height: 269 },
            title: { text: lineData.chartName },
            yAxis: { title: { text: lineData.yAxisName } },
            xAxis: { categories: lineData.labels },
            plotOptions: { series: { dataLabels: { enabled: true } } },
            series: [
                { name: lineData.firstLineName, data: lineData.firstLine },
                { name: lineData.secondLineName, data: lineData.secondLine }
            ]
        }
    };

    chartExporter.export(chartDetails, (expErr: any, res: any) => {
        if (expErr) {
            return res1.status(500).send("Export error")
        }

        fs.writeFileSync("./images/doubleLineImage.png", res.data, 'base64');
        chartExporter.killPool();
        return res1.status(200).send("data:image/png;base64," + res.data);
    });

});

app.post('/singlelinechart', async (req: any, res1: any) => {
    let lineData = {} as DoubleLine;
    lineData = req.body;
    if (!lineData || lineData == null || JSON.stringify(lineData) === JSON.stringify({})) {
        return res1.status(500).send("Data is null or wrong!");
    }

    const chartDetails = {
        type: "png", options: {
            colors: [{
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, '#baeffc'], [1, '#32aedc']]
            }],
            chart: { type: 'areaspline', width: 621, height: 269 },
            title: { text: lineData.chartName },
            yAxis: { title: { text: lineData.yAxisName } },
            xAxis: { categories: lineData.labels },
            plotOptions: { series: { dataLabels: { enabled: true } } },
            series: [
                { name: lineData.firstLineName, data: lineData.firstLine }
            ]
        }
    };

    chartExporter.export(chartDetails, (expErr: any, res: any) => {
        if (expErr) {
            return res1.status(500).send("Export error")
        }

        fs.writeFileSync("./images/singleLineImage.png", res.data, 'base64');
        chartExporter.killPool();
        return res1.status(200).send("data:image/png;base64," + res.data);
    });

});


app.post('/piechart', async (req: any, res1: any, next: any) => {
    let pieData = {} as PieData;
    pieData = req.body;
    if (!pieData || pieData == null || JSON.stringify(pieData) === JSON.stringify({}) || !pieData.data) {
        return res1.status(500).send("Data is null or wrong!");
    }

    let pie_data = []
    for (let i = 0; i < pieData.data.length; i++) {
        const e = pieData.data[i];
        pie_data.push({ name: e.name, y: Number(e.y) });
    }
    const chartDetails = {
        type: "png",
        options: {
            chart: {
                plotBackgroundColor: null, plotBorderWidth: null,
                plotShadow: false, type: 'pie'
            },
            title: { text: pieData.chartName },
            plotOptions: {
                pie: {
                    allowPointSelect: true, cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{ name: pieData.chartName, data: pie_data }]
        }
    };

    chartExporter.export(chartDetails, (expErr: any, res: any) => {
        if (expErr) {
            return res1.status(500).send("Export error")
        }

        fs.writeFileSync("./images/pieImage.png", res.data, "base64");
        chartExporter.killPool();
        return res1.status(200).send("data:image/png;base64," + res.data);

    });

});


app.listen(3000)
console.log('Server is running on 3000');