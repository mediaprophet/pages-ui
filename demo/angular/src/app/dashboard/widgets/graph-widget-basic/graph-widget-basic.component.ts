import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { GraphWidgetService } from './graph-widget.service';

declare var pg: any;
declare let d3: any;

//import echarts
import { EChartsOption } from 'echarts';
import * as moment from 'moment';
@Component({
	selector: 'graph-widget-basic',
	templateUrl: './graph-widget-basic.component.html',
	styleUrls: ['./graph-widget-basic.component.scss'],
	providers: [GraphWidgetService],
	encapsulation: ViewEncapsulation.None
})
export class GraphWidgetBasicComponent implements OnInit, OnDestroy {
	nvd3LineData = [];
	nvd3LineOptions;
	_emphasize = false;
	_chartWrapperClass = 'col-xlg-8 col-lg-12';
	_chartHighlightsClass = 'col-xlg-4 visible-xlg';
	service;
	COLOR_SUCCESS = pg.getColor('success');
	COLOR_DANGER = pg.getColor('danger');
	COLOR_PRIMARY = pg.getColor('primary');
	COLOR_COMPLETE = pg.getColor('complete');
	timeout;

	lineData = [];

	constructor(private _service: GraphWidgetService) { }
	chartOption: EChartsOption = {}

	ngOnInit() {
		this.service = this._service.getChartSampleData().subscribe(d => {
			this.timeout = setTimeout(() => {
				this.lineData = d["nvd3"]["line"];

				//Chart data and customization
				this.chartOption = {
					tooltip: {
						trigger: 'axis',
						backgroundColor: 'white',
						borderRadius: 0,
						textStyle: {
							color: "#4B4B4B",
							fontWeight: 'normal',
							fontFamily: 'sans-serif',
							fontSize: '11px'
						},
						extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
					},
					legend: {},
					grid: {
						show: false,
						top: '5%',
						left: '2%',
						right: '2%',
						bottom: '0%',
						containLabel: true
					},
					xAxis: {
						show: true,
						axisLine: {
							show: true,
						},
						axisTick: {
							show: false,
						},
						type: 'category',
						data: [],
						axisLabel: {
							showMinLabel: false,
							interval: 30
						},

					},
					yAxis: {
						axisLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							showMinLabel: false,
							showMaxLabel: false,

						},
						splitLine: {
							show: true,
							lineStyle: {
								color: "rgba(239, 233, 233, 1)"
							}
						},
						data: [],
						type: 'value',

					},
					series: [
						{
							type: "line",
							data: [],
							symbol: 'none',
							lineStyle: {
								width: 1.8
							},
							itemStyle: {
								color: "#17AD79"
							}
						},
						{
							data: [],
							type: 'line',
							symbol: 'none',
							lineStyle: {
								width: 1.8
							},
							itemStyle: {
								color: "#D73C30"
							}
						},
						{
							data: [],
							type: 'line',
							symbol: 'none',
							lineStyle: {
								width: 1.8
							},
							itemStyle: {
								color: "#0072EC"
							}
						}
					]
				}

				//Setting the data to our chart
				this.chartOption.yAxis.data = this.lineData[0].values.map(function (item) {
					return item[1];
				})

				this.chartOption.xAxis.data = this.lineData[0].values.map(function (item) {
					var returnItem = moment.unix(item[0]).format('ddd');
					return returnItem;
				})

				this.chartOption.series[0].data = this.lineData[0].values.map(function (item) {
					return Math.round(item[1]);
				})
				this.chartOption.series[1].data = this.lineData[1].values.map(function (item) {
					return Math.round(item[1]);
				})
				this.chartOption.series[2].data = this.lineData[3].values.map(function (item) {
					return Math.round(item[1]);
				})
			}, 1000)
		})
	}

	ngAfterViewInit() {

		setTimeout(() => {
			window.dispatchEvent(new Event('resize'));
		}, 3000);
	}

	ngOnDestroy() {
		this.service.unsubscribe();
		clearTimeout(this.timeout);
	}

	@Input()
	set Emphasize(value: boolean) {
		this._emphasize = value;
	}

	@Input()
	set ChartWrapperClass(value: string) {
		this._chartWrapperClass = value;
	}

	@Input()
	set ChartHighlightsClass(value: string) {
		this._chartHighlightsClass = value;
	}
}
