import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
const timeSeries=[
    {
        keyword:"DIGITAL _CURRENCY_DAILY",
        key:"TIME SERIES (DAILY)",
        label:"1 DAY",
        value:1,
    },
    {
        keyword:"DIGITAL _CURRENCY_WEEKLY",
        key:"Weekly Time Series",
        label : "1 Week",
        value:7,
    },
    {
        keyword:"DIGITAL _CURRENCY_MONTHLY",
        key:"Monthly Time Series",
        label : "1 Month",
        value:30,
    }
];
const StockChart = () => { 
    const [activeLable,setActivelable]  =useState("1 Day")
    const series = [{
        data: [[1771613100595,67720.4363443936],[1771613400780,67793.03536847],[1771613722176,67810.90352653585],[1771614021314,67920.91594116506],[1771614331014,67813.250694569],[1771614641197,67776.52129630258],[1771614980867,67697.43825328746],[1771615270592,67701.83705727277],[1771615560672,67712.8652498275],[1771615851392,67609.83124435743],[1771616156846,67766.89062270975],[1771616471695,67746.9692144033],[1771616750543,67591.45324717113],[1771617101499,67579.38869256264],[1771617360468,67632.05745796283],[1771617671748,67622.66814335548],[1771617960804,67683.86014669982],[1771618293548,67745.90031768937],[1771618553946,67775.45727240012],[1771618871961,67702.59996198415],[1771619160608,67634.23895349927],[1771619460703,67563.39924302803],[1771619760586,67569.15041719658],[1771620043159,67659.68863774517],[1771620350677,67707.04515730526],[1771620643025,67684.45918882365],[1771620915217,67672.93533241056],[1771621237763,67700.63320434374],[1771621548324,67667.14512327267],[1771621853614,67762.57710165657],[1771622140820,67687.8141925141]],
    }]
    const options ={
        chart :{
            id: "area-datetime",
            type:"area",
            height: 350,
            zoom:{
                autoscaleYaxis:true
            }
        },
        dataLabela :{
            enabled:false
        },
        xaxis:{
            type:"datetime",
            tickamount:6
        },
        colors:["#758AA2"],
        markers:{
            colors:["#fff"],
            strokeColor:"#fff",
            size:0,
            strokeWidth:1,
            style:"hollow"
        },
        tooltip:{
            theme:"dark"
        },
        fill:{
            type:"gradient",
            gradient:{
    
                shadeIntensity:1,
                opacityFrom:0.8,
                opacityTo:0.9,
                stops:[0,100]

            }
        },
        grid:{
            borderColor:"#4735E",
            strokeDashArray:4,
            show:true
        }
    }
    const handleActiveLable=(value)=>{
        setActivelable(value);

    }
  return (
    <div>
        <div className="space-x-3" >
            {timeSeries.map((item) =><Button
            variant={activeLable==item.label?"":"outline"}
             onClick={()=>handleActiveLable(item.label)} key={item.label}>
                {item.label}
            </Button>)}

        </div>


      <div id="chart-timelines" >
        <ReactApexChart
        options={options}
        series={series}
        height={450}
        type="area"



        />

      </div>
    </div>
  )
}

export default StockChart
