import React, { memo } from 'react';
import { Gauge } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

// Properti untuk ChartGauge
interface ChartGaugeProps {
    percent?: number;
    color?: string[];
    min?: number;
    max?: number;
    bawah?: number;
    atas?: number;
    unit?: string;
}

const ChartGauge = memo(({
    percent = 15,
    color = ['#F4664A', '#FAAD14', '#30BF78'],
    min = 0,
    max = 100,
    bawah = 30,
    atas = 60,
    unit = '%'
}: ChartGaugeProps) => {

    const nilai = (percent - min) / (max - min);

    const config = {
        style: {
            height: 150,
            width: 150,
        },
        percent: nilai,
        range: {
            ticks: [
                0,
                (bawah - min) / (max - min),
                (atas - min) / (max - min),
                1,
            ],
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
                    paddingTop: '5px',
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
