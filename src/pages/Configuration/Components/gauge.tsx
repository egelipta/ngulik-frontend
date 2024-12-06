import React, { memo } from 'react';
import { Gauge } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

// Properti untuk ChartGauge
interface ChartGaugeProps {
    percent?: number;
    conditions?: string;
    color?: string[];
    min?: number;
    max?: number;
    lower?: number;
    normallower?: number;
    normalupper?: number;
    upper?: number;
    unit?: string;
}

const ChartGauge = memo(({
    percent = 45,
    conditions = 'default',
    color = ['#F4664A', '#FAAD14', '#30BF78'],
    min = 0,
    max = 100,
    lower = 20,
    normallower = 40,
    normalupper = 60,
    upper = 80,
    unit = '%'
}: ChartGaugeProps) => {

    const nilai = (percent - min) / (max - min);

    //TICKS
    const limit = conditions === 'min-max'
        ? [
            0,
            (lower - min) / (max - min),
            (normallower - min) / (max - min),
            (normalupper - min) / (max - min),
            (upper - min) / (max - min),
            1,
        ] : [
            0,
            (lower - min) / (max - min),
            (upper - min) / (max - min),
            1,
        ]

    const config = {
        style: {
            height: 150,
            width: 150,
        },
        percent: nilai,
        range: {
            ticks: limit,
            color: color,
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        statistic: {
            content: {
                formatter: () => `${percent}${unit}`,
                style: {
                    paddingTop: '7px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#444546',
                },
            },
        },
        axis: {
            label: {
                formatter: (v: string) => {
                    return (Number(v) * (max - min) + min).toFixed(0)
                },
            },
        },
    };

    return (
        <ProCard
            bordered
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Gauge {...config} />
        </ProCard>
    );
});

export default ChartGauge;
