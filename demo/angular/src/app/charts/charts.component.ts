import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from './charts.service';
import * as moment from 'moment';
import { stackedAreaData, lineAreaData } from './data';

declare let d3: any;
declare var pg: any;


@Component({
  selector: 'charts-page',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent implements OnInit, OnDestroy {
  @ViewChild('pieChartContainer', { static: true })
  _pieChartContainer: ElementRef;
  echartsIntance;

  @ViewChild('realTimeChartWrapper', { static: true })
  _realTimeChartWrapper: ElementRef;
  realtimeChartInitOptions;
  realtimeChartOptions;
  realtimeChartIntance;
  realtimeChartUpdate;

  @ViewChild('areaSliderChartWrapper', { static: true })
  _areaSliderChartWrapper: ElementRef;
  areaSliderChartInitOptions;
  areaSliderChartOptions;
  areaSliderChartIntance;
  areaSliderChartUpdate;

  @ViewChild('stackedBarChartWrapper', { static: true })
  _stackedBarChartWrapper: ElementRef;
  stackedBarChartInitOptions;
  stackedBarChartOptions;
  stackedBarChartIntance;
  stackedBarChartUpdate;

  @ViewChild('lineChartWrapper', { static: true })
  _lineChartWrapper: ElementRef;
  lineChartInitOptions;
  lineChartOptions;
  lineChartIntance;
  lineChartUpdate;
  lineData;

  @ViewChild('stackedAreaChartWrapper', { static: true })
  _stackedAreaChartWrapper: ElementRef;
  stackedAreaChartInitOptions;
  stackedAreaChartOptions;
  stackedAreaChartIntance;
  stackedAreaChartUpdate;

  @ViewChild('lineAreaChartWrapper', { static: true })
  _lineAreaChartWrapper: ElementRef;
  lineAreaChartInitOptions;
  lineAreaChartOptions;
  lineAreaChartIntance;
  lineAreaChartUpdate;

  barChartOptions;
  barChartData = [
    {
      key: 'New Users',
      values: [],
    },
    {
      key: 'Returning Users',
      values: [],
    },
  ];

  options;
  nvd3LineOptions;
  nvd3LineData;
  nvd3LineAreaOptions;
  nvd3LineAreaData;
  data;
  optionsPie;
  initOptionsPie;
  optionsLineStack;
  initOptionsLineStack;

  service;
  interval;
  timeout;
  timeoutinit;
  barChartTimer;

  // Sample Data
  seriesData = [[], [], []];
  widget;

  constructor(private _service: ChartService, private http: HttpClient) {
    //Generate Random Data
    let data = [[], []];

    var max = 60;
    var min = 40;

    for (var i = 0; i < 40; i++) {
      let x = [i, Math.round(Math.random() * (max - min) + min)];
      data[0].push(x);
      x = [i, Math.round(Math.random() * (max - min) + min)];
      data[1].push(x);
    }
    this.barChartData[0]['values'] = data[0];
    this.barChartData[1]['values'] = data[1];
  }

  initRealtimeChart() {
    const parentElement = this._realTimeChartWrapper.nativeElement;
    const { width, height } = parentElement.getBoundingClientRect();

    this.realtimeChartInitOptions = {
      renderer: 'svg',
      width,
      height: 500,
    };

    var yValues = [];
    var xValues = [];
    var yValues2 = [];
    var max = 100;
    var min = 80;

    var max2 = 60;
    var min2 = 45;

    var xVal = 50;

    for (var i = 1; i < xVal; i++) {
      xValues.push(i);
      yValues.push(Math.round(Math.random() * (max - min) + min));
    }
    for (var i = 1; i < xVal; i++) {
      yValues2.push(Math.round(Math.random() * (max2 - min2) + min2));
    }

    this.realtimeChartOptions = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        padding: 10,
        textStyle: {
          color: pg.getColor('contrast-high'),
          fontSize: 12,
          fontFamily: 'Arial',
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            opacity: 0.6,
          },
        },
        extraCssText: 'box-shadow: 0 0 6px rgba(0,0,0,.1);',
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 50,
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xValues,
          show: false,
          axisLabel: {
            show: true,
            interval: 1,
            color: 'rgba(0,0,0,.3)',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            interval: 1,
            color: 'rgba(0,0,0,.3)',
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              opacity: 0.9,
              type: 'dashed',
            },
          },
          backgroundColor: '#fff',
        },
      ],
      series: [
        {
          name: 'DB Server',
          type: 'line',
          stack: '',
          areaStyle: {
            color: pg.getColor('contrast-high'),
            opacity: 0.1,
          },
          data: yValues,
          itemStyle: {
            color: pg.getColor('contrast-high'),
          },
          lineStyle: {
            width: 0,
          },
          symbolSize: 1,
          showSymbol: false,
          markLine: {
            label: {
              normal: {
                show: false,
              },
            },
          },
        },
        {
          name: 'Web Server',
          type: 'line',
          stack: '',
          areaStyle: {
            color: pg.getColor('success-light', 0.5),
            opacity: 1,
          },
          data: yValues2,
          itemStyle: {
            color: pg.getColor('success'),
          },
          lineStyle: {
            width: 0,
          },
          symbolSize: 1,
          markLine: {
            label: {
              normal: {
                show: false,
              },
            },
          },
        },
      ],
    };

    this.interval = setInterval(
      function () {
        var updatedOptions = { ...this.realtimeChartOptions };
        var data0 = updatedOptions.series[0].data;
        var data1 = updatedOptions.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * (max - min) + min));
        data1.shift();
        data1.push(Math.round(Math.random() * (max2 - min2) + min2));

        updatedOptions.xAxis[0].data.shift();
        updatedOptions.xAxis[0].data.push(xVal);

        xVal++;

        this.realtimeChartUpdate = updatedOptions;
      }.bind(this),
      1500
    );
  }

  initBarChart() {
    this.barChartTimer = setTimeout(() => {
      this.barChartOptions = {
        chart: {
          type: 'multiBarChart',
          color: [pg.getColor('complete'), pg.getColor('contrast-low')],
          x: function (d) {
            return d[0];
          },
          y: function (d) {
            return d[1];
          },
          multibar: {
            stacked: true,
          },
          showControls: false,
          useInteractiveGuideline: false,
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          yDomain: [0, 200],
          showLegend: false,
          showXAxis: false,
          showYAxis: false,
          interactive: false,
        },
      };
    }, 2000);
  }

  initEchartsPie() {
    const parentElement = this._pieChartContainer.nativeElement;
    const { width, height } = parentElement.getBoundingClientRect();

    this.initOptionsPie = {
      renderer: 'svg',
      width,
      height,
    };

    this.optionsPie = {
      tooltip: {
        trigger: 'item',
        formatter: '{c} ({d}%)',
        backgroundColor: '#fff',
        padding: 10,
        textStyle: {
          color: pg.getColor('contrast-high'),
          fontSize: 12,
          fontFamily: 'Arial',
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            opacity: 0.6,
          },
        },
        extraCssText: 'box-shadow: 0 0 6px rgba(0,0,0,.1);',
      },
      series: [
        {
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: [
            {
              value: 4,
              name: 'Pages',
              itemStyle: {
                color: pg.getColor('warning', 0.8),
              },
            },
            {
              value: 3,
              name: 'Webarch',
              itemStyle: {
                color: pg.getColor('danger', 0.8),
              },
            },
            {
              value: 2,
              name: 'Revox',
              itemStyle: {
                color: pg.getColor('master-light', 0.8),
              },
            },
            {
              value: 1,
              name: 'Frontend',
              itemStyle: {
                color: pg.getColor('master', 0.8),
              },
            },
          ],
          label: {
            show: false,
          },
          hoverAnimation: false,
          // emphasis: {
          //   itemStyle: {
          //     hoverAnimation: false,
          //     shadowBlur: 2,
          //     shadowOffsetX: 0,
          //     shadowColor: 'rgba(0, 0, 0, 0.5)'
          //   },
          // }
        },
      ],
    };
  }

  initEchartsLine() {
    this.initOptionsLineStack = {
      renderer: 'svg',
      width: 460,
      height: 300,
    };

    this.optionsLineStack = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        padding: 10,
        textStyle: {
          color: pg.getColor('contrast-high'),
          fontSize: 12,
          fontFamily: 'Arial',
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            opacity: 0.6,
          },
        },
        extraCssText: 'box-shadow: 0 0 6px rgba(0,0,0,.1);',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [10, 10, 25, 29, 20, 22, 20, 22],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          backgroundColor: '#fff',
        },
      ],
      series: [
        {
          name: 'Visitors',
          type: 'line',
          stack: '',
          areaStyle: {
            opacity: 0.4,
          },
          data: [10, 10, 25, 29, 20, 22, 20, 22],
          clipOverflow: 'start',
          itemStyle: {
            color: pg.getColor('warning'),
          },
          lineStyle: {
            width: 0,
          },
        },
        {
          name: 'New Visitors',
          type: 'line',
          stack: '',
          areaStyle: {
            opacity: 0.4,
          },
          data: [0, 10, 8, 20, 15, 10, 15, 5],
          clipOverflow: 'start',
          itemStyle: {
            color: pg.getColor('danger'),
          },
          lineStyle: {
            width: 0,
          },
        },
      ],
    };
  }
  ngOnInit() {
    this.service = this._service.getChartSampleData().subscribe((d) => {
      this.timeout = setTimeout(() => {
        this.data = d['nvd3'].stackedArea;
        this.nvd3LineData = d['nvd3'].line;
        this.nvd3LineAreaData = d['nvd3'].monthSales;
        this.options = {
          chart: {
            type: 'stackedAreaChart',
            height: 450,
            color: [
              pg.getColor('success', 0.7),
              pg.getColor('info'),
              pg.getColor('primary', 0.87), //south america
              pg.getColor('warning'),
              pg.getColor('complete', 0.67), //europe
              pg.getColor('success-dark'),
              pg.getColor('menu', 0.2), //antarctica
            ],
            margin: {
              left: 15,
            },
            x: function (d) {
              return d[0];
            },
            y: function (d) {
              return Math.round(d[1] * 100);
            },
            useInteractiveGuideline: true,
            duration: 500,
            showControls: true,
            clipEdge: true,
            rightAlignYAxis: true,
            xAxis: {
              tickFormat: (d) => {
                return d3.time.format('%a')(new Date(d));
              },
            },
            yAxis: {
              tickFormat: (d) => {
                return d3.format(',')(d);
              },
            },
          },
        };
        this.nvd3LineOptions = {
          chart: {
            type: 'lineChart',
            color: [
              pg.getColor('success'),
              pg.getColor('danger'),
              pg.getColor('primary'), //south america

              pg.getColor('complete'), //europe
            ],
            height: 450,
            x: function (d) {
              return d[0];
            },
            y: function (d) {
              return d[1] / 100;
            },
            //showValues: true,
            useInteractiveGuideline: true,
            duration: 500,
            showControls: true,
            clipEdge: true,
            xAxis: {
              tickFormat: (d) => {
                return d3.time.format('%b/%d/%Y')(new Date(d));
              },
            },
            yAxis: {
              tickFormat: (d) => {
                return d3.format('.02f')(d);
              },
            },
          },
        };

        this.nvd3LineAreaOptions = {
          chart: {
            type: 'lineChart',
            color: [pg.getColor('success')],
            height: 450,
            x: function (d) {
              return d[0];
            },
            y: function (d) {
              return d[1] / 100;
            },
            showValues: true,
            valueFormat: function (d) {
              return d3.format(',.4f')(d);
            },
            useInteractiveGuideline: true,
            duration: 500,
            showControls: true,
            clipEdge: true,
            xAxis: {
              tickFormat: (d) => {
                return d3.time.format('%b-%d-%Y')(new Date(d));
              },
            },
            yAxis: {
              tickFormat: (d) => {
                return d3.format('.02f')(d);
              },
            },
          },
        };
      }, 2000);
    });
  }

  ngOnDestroy() {
    this.service.unsubscribe();
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    clearTimeout(this.timeoutinit);
    clearTimeout(this.barChartTimer);
  }

  onResize(event) {
    this.resizeChart();
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  resizeChart() {
    if (this.echartsIntance) {
      const parentElement = this._pieChartContainer.nativeElement;
      const { width, height } = parentElement.getBoundingClientRect();

      this.echartsIntance.resize({ width, height });
    }
  }

  // realtime chart
  onRealtimeChartResize(event) {
    this.realtimeChartResize();
  }

  onRealtimeChartInit(ec) {
    this.realtimeChartIntance = ec;
  }

  realtimeChartResize() {
    if (this.realtimeChartIntance) {
      const parentElement = this._realTimeChartWrapper.nativeElement;
      const { width, height } = parentElement.getBoundingClientRect();

      this.realtimeChartIntance.resize({ width, height: 500 });
    }
  }

  // area slider
  onAreaSliderChartResize(event) {
    this.areaSliderChartResize();
  }

  onAreaSliderChartInit(ec) {
    this.areaSliderChartIntance = ec;
  }

  areaSliderChartResize() {
    if (this.areaSliderChartIntance) {
      const parentElement = this._areaSliderChartWrapper.nativeElement;
      const { width, height } = parentElement.getBoundingClientRect();

      this.areaSliderChartIntance.resize({ width, height: 500 });
    }
  }

  initStackedBarChart() {

    this.stackedBarChartOptions = {
		tooltip: {
			backgroundColor: 'white',
			borderRadius:0,
		
			textStyle:{
				color:"#4B4B4B",
				fontWeight: 'normal',
            	fontFamily: 'sans-serif',
            	fontSize: '11px'
			},
			extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
		},
		legend:{show:false},
		grid: {
			
			show:false,
			top:'10%',
			left: '0%',
			right: '0%',
			bottom: '0%',
			containLabel: false
		},
		 xAxis: [
			 {
				
				 axisLine:{
					 show:false,
				 },
				 axisTick:{
					show:false,
				},
				type: 'category',
        		data: [],
        		splitLine: {
          			show: false
       			},
			 },
		],
		yAxis: [	
			{
				axisLine:{
					show:false,
				},
			  	type: 'value',
			  	splitLine: {
					show: false
			  	},
			}
		],
		series: [
			{
			  name: 'New Users',
			  type: 'bar',
			  barWidth: "90%",
			  stack: 'Ad',
			  emphasis: {
				focus: 'series'
			  },
			  itemStyle: {color: '#5292EF'},
			  data: []
			},
			{
			  name: 'Returning Users',
			  type: 'bar',
			  stack: 'Ad',
			  emphasis: {
				focus: 'series'
			  },
			  itemStyle:{color:"#E5E5E5"},
			  data: []
			},
		   
		   
		  ],
		};


	let data = [[],[]]
	
	var max = 90;
	   var min = 80;

	for (var i = 0; i < 40; i++) {
		let x = [i, Math.round(Math.random() * (max - min) + min)];
		data[0].push(x);
		x = [i, Math.round(Math.random() * (max - min) + min)];
		data[1].push(x);
		this.stackedBarChartOptions.xAxis[0].data.push(" ");
	}

	this.stackedBarChartOptions.series[0].data = data[0];
	this.stackedBarChartOptions.series[1].data = data[1];
  }

  initAreaSliderChart() {
    const parentElement = this._areaSliderChartWrapper.nativeElement;
    const { width, height } = parentElement.getBoundingClientRect();

    this.areaSliderChartInitOptions = {
      renderer: 'svg',
      width,
      height: 500,
    };

    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    for (var i = 1; i < 20000; i++) {
      var now = new Date((base += oneDay));
      date.push(
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
      );
      data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }

    this.areaSliderChartOptions = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        padding: 10,
        textStyle: {
          color: pg.getColor('contrast-high'),
          fontSize: 12,
          fontFamily: 'Arial',
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            opacity: 0.6,
          },
        },
        formatter: function (series) {
          const marker1 = series[0].marker;
          const label1 = series[0].seriesName;
          const val1 = series[0].value;
          const axisValue = parseInt(series[0].axisValue);

          var today = new Date();
          var date = new Date();
          date.setDate(today.getDate() + axisValue);

          return `<div>
              <div>
                <span class="pull-left fs-12">${label1}: ${val1}</span>
                <span class="pull-right">${marker1}</span>
                <div class="clearfix"></div>
              </div>
              <div class="fs-11 text-muted">${date.toString()}</div>
            </div>`;
        },
        extraCssText: 'box-shadow: 0 0 6px rgba(0,0,0,.1);',
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 60,
        top: 50,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date,
        axisLabel: {
          show: true,
          color: 'rgba(0,0,0,.3)',
        },
        axisLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],

        axisLabel: {
          show: true,
          interval: 1,
          color: 'rgba(0,0,0,.3)',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            opacity: 0.9,
            type: 'dashed',
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
          handleIcon:
            'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          fillerColor: pg.getColor('success', 0.4),
          handleStyle: {
            color: '#fff',
            // shadowBlur: 3,
            // shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      ],
      series: [
        {
          name: 'Temperature',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          lineStyle: {
            width: 0,
          },
          itemStyle: {
            normal: {
              color: pg.getColor('success'),
            },
          },
          areaStyle: {
            normal: {
              color: pg.getColor('success', 0.5),
            },
          },
          data: data,
        },
      ],
    };
  }

  initLineChart() {
	this.service = this._service.getChartSampleData().subscribe(d => {
		this.timeout = setTimeout(() => {
			this.lineData = d["nvd3"]["line"];
		  
		  //Chart data and customization
		  this.lineChartOptions= {
			  tooltip: {
				  trigger:'axis',
				  backgroundColor: 'white',
				  borderRadius:0,
				  textStyle:{
					  color:"#4B4B4B",
					  fontWeight: 'normal',
					  fontFamily: 'sans-serif',
					  fontSize: '11px'
				  },
				  extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
			  },
			  legend:{},
			  grid: {
				  show:false,
				  top:'5%',
				  left: '2%',
				  right: '2%',
				  bottom: '0%',
				  containLabel: true
			  },
			  xAxis: {
				  show:true,
				  axisLine:{
					  show:true,
				  },
				  axisTick:{
					 show:false,
				 },
				  type: 'category',
				  data: [],
				  axisLabel:{
					  showMinLabel:false,
					  interval:30
				  },
		  
				},
				yAxis: {
				  axisLine:{
					  show:false,
				  },
				  axisTick:{
					  show:false,
				  },
				  axisLabel:{
					  showMinLabel:false,
					  showMaxLabel:false,
					  
				  },
				  splitLine:{
					  show:true,
					  lineStyle: {
						  color: "rgba(239, 233, 233, 1)"
						}
				  },
				  data:[],
				  type: 'value',
			  
				},
				series: [
				  {
					  type:"line",
					  data:[],
					  symbol:'none',
					  lineStyle:{
						  width:1.8
					  },
					  itemStyle:{
						  color:"#17AD79"
					  } 		
				  },
				  {
					data: [],
					type: 'line',
					symbol:'none',
					lineStyle:{
					  width:1.8
				  },
					itemStyle:{
						color:"#D73C30"
					}
				  },
				  {
					  data: [],
					  type: 'line',
					  symbol:'none',
					  lineStyle:{
						  width:1.8
					  },
					  itemStyle:{
						  color:"#0072EC"
					  }
				  }
				]
			}
		  
		  //Setting the data to our chart
		  this.lineChartOptions.yAxis.data = this.lineData[0].values.map(function(item){
				  return item[1];
		  })

		  this.lineChartOptions.xAxis.data = this.lineData[0].values.map(function(item){
			  var returnItem = moment.unix(item[0]).format('ddd');
			  return returnItem;
		  })

		  this.lineChartOptions.series[0].data = this.lineData[0].values.map(function(item){
			  return Math.round(item[1]);
		  })
		  this.lineChartOptions.series[1].data = this.lineData[1].values.map(function(item){
			  return Math.round(item[1]);
		  })
		  this.lineChartOptions.series[2].data = this.lineData[3].values.map(function(item){
			  return Math.round(item[1]);
		  })
		},1000)
	})
  }

  initStackedAreaChart(){

	this.stackedAreaChartOptions = {
		color: ["#A996E5", "#8DBDF7", "#E1E2E3"],
		legend: {
		  data: [
			"North America",
			"Africa",
			"South America",
			"Asia",
			"Europe",
			"Australia",
			"Antarctica",
		  ],
		  top: "top",
		  right: "1%",
		  icon: "circle",
		},
		tooltip: {
		  trigger: "axis",
		  backgroundColor: "#fff",
		  padding: 10,
		  textStyle: {
			color: "black",
			fontSize: 13,
			fontFamily: "Arial",
		  },
		  formatter: function (params) {
			return `${params[0].marker} ${
			  params[0].seriesName
			} : ${params[0].value.toFixed(2)}<br />${params[1].marker} ${
			  params[1].seriesName
			} : ${params[1].value.toFixed(2)}<br />${params[2].marker} ${
			  params[2].seriesName
			} : ${params[2].value.toFixed(2)}<br />
					  `;
		  },
		  axisPointer: {
			type: "line",
			lineStyle: {
			  opacity: 0.6,
			},
		  },
		  extraCssText: "box-shadow: 0 0 6px rgba(0,0,0,0.1);",
		},
		grid: {
		  left: "0%",
		  right: "0%",
		  bottom: "0%",
		  containLabel: true,
		},
		xAxis: [
		  {
			type: "category",
			boundaryGap: false,
			show: false,
			data: (function () {
			  let res = [];
			  let len = 0;
			  while (len < 118) {
				res.push(len + 1);
				len++;
			  }
			  return res;
			})(),
		  },
		],
		yAxis: [
		  {
			type: "value",
			show: true,
			position: "right",
			axisLine: {
			  show: false,
			},
			axisLabel: {
			  show: true,
			  interval: 1,
			},
			axisTick: {
			  show: false,
			},
			splitLine: {
			  show: true,
			  lineStyle: {
				opacity: 0.3,
			  },
			},
			backgroundColor: "red",
		  },
		],
		series: [
		  {
			name: "North America",
			type: "line",
			stack: "series",
			areaStyle: {},
			data: stackedAreaData[0].values,
			showSymbol: false,
			lineStyle: {
			  width: 0,
			},
		  },
	
		  {
			name: "Europe",
			type: "line",
			stack: "series",
			areaStyle: {},
			data: stackedAreaData[4].values,
			showSymbol: false,
			lineStyle: {
			  width: 0,
			},
		  },
		  {
			name: "Australia",
			type: "line",
			stack: "series",
			areaStyle: {},
			data: stackedAreaData[5].values,
			showSymbol: false,
			lineStyle: {
			  width: 0,
			},
		  },
		],
	  };
  }

  initLineAreaChart(){
	this.lineAreaChartOptions = {
		color: ["#19ad79"],
		legend: {
		  data: ["6 months sales"],
		  show: true,
		  top: "top",
		  right: "2%",
		  icon: "circle",
		},
		tooltip: {
			trigger: "axis",
			backgroundColor: "#fff",
		  	padding: 10,
		  	textStyle: {
			color: "black",
			fontSize: 13,
			fontFamily: "Arial",
		  },
		},
		xAxis: {
		  type: "category",
		  boundaryGap: false,
		  show: true,
		  data: lineAreaData[0].values,
		  axisLine: {
			show: false,
		  },
		},
		grid: {
		  left: "2%",
		  right: "2%",
		  containLabel: true,
		},
		yAxis: {
		  type: "value",
		  show: true,
		  minorTrick: {
			show: false,
		  },
		  axisLine: {
			show: false,
		  },
		  axisLabel: {
			color: "#757575",
		  },
		  axisTick: {
			show: false,
		  },
	
		  splitLine: {
			show: true,
			lineStyle: {
			  opacity: 0.3,
			},
		  },
		},
		series: [
			{
			  name: "6 months sales",
			  data: lineAreaData[1].values,
			  type: "line",
			  areaStyle: { opacity: 0.3 },
			  showSymbol: false,
			},
		  ],
	  };
  }
  ngAfterViewInit() {
    this.timeoutinit = setTimeout(() => {
      this.initBarChart();
      this.initAreaSliderChart();
	  this.initStackedBarChart();
      this.initEchartsPie();
      this.initEchartsLine();
      this.initRealtimeChart();
	  this.initLineChart();
	  this.initStackedAreaChart();
	  this.initLineAreaChart();

      this.resizeChart();
      this.realtimeChartResize();
      this.areaSliderChartResize();
    }, 1000);
  }
}
