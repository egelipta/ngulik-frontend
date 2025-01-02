import ChartGauge from "./gauge";
import ChartLiquid from "./liquid";
import ChartMultiLine from "./multi-line";
import ChartLine from "./line";
import ChartPie from "./pie";
import ChartColumn from "./column";
import ChartRing from "./ring";

const theComponent: Record<string, React.ElementType> = {
    ChartGauge,
    ChartLiquid,
    ChartMultiLine,
    ChartLine,
    ChartPie,
    ChartColumn,
    ChartRing,
};



type ConfigType = {
    name?: string;
    devid?: any;
    percent?: number;
    data?: string[];
    conditions?: string;
    color?: string[] | string;
    unit?: string;
    min?: number;
    lower?: number;
    normallower?: number;
    normalupper?: number;
    upper?: number;
    max?: number;
    border?: number;
    distance?: number;
    smooth?: number;
    innerRadius?: number;
    dType?: string;
    dlist?: any;
};

const defConf: Record<string, ConfigType> = {
    //moch data pada open modal add-component
    ChartGauge: {
        devid: null,
        percent: 0,
        name: 'Gauge',
        conditions: 'min',
        color: ['#F4664A', '#FAAD14', '#30BF78'],
        unit: '%',
        min: 0,
        max: 100,
        lower: 20,
        normallower: 40,
        normalupper: 60,
        upper: 80,
        dType: '',
    },
    ChartLiquid: {
        devid: null,
        percent: 0,
        name: 'Liquid',
        color: '#5c91da',
        unit: '%',
        dType: 'circle',
        border: 4,
        distance: 3
    },
    ChartMultiLine: {
        devid: null,
        data: [],
        name: 'Multi Line',
        smooth: 0,
        dType: 'line',
        color: [
            "#4accf4",
            "#0abc21",
            "#6b6868",
            "#fa0c0c",
            "#b9b3b3"
        ],
    },
    ChartLine: {
        devid: null,
        data: [],
        name: 'Line',
        smooth: 0,
        dType: 'line',
        color: '#5c91da'
    },
    ChartPie: {
        devid: null,
        data: [],
        name: 'Pie',
        innerRadius: 0,
    },
    ChartColumn: {
        devid: null,
        data: [],
        name: 'Column',
    },
    ChartRing: {
        devid: null,
        percent: 0,
        name: 'Ring',
        color: ['#5B8FF9', '#E8EDF3'],
    },
};

const exportComponent = { theComponent, defConf };
export default exportComponent;
