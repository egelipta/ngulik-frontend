import React, { memo } from 'react';
import { RingProgress } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartRingProps {
    percent?: number;
    color?: string[];
    unit?: string;
}

const ChartRing = memo((
    {
        percent = 15,
        color = ['#5B8FF9', '#E8EDF3'],
        unit = '%'
    }: ChartRingProps) => {

    const config = {
        height: 150,
        width: 150,
        autoFit: false,
        percent: percent / 100,
        color: color,
        statistic: {
            title: undefined,
            content: {
                formatter: () => `${percent}${unit}`,
                style: { fontWeight: 'bold', fontSize: '16px' },
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
            <RingProgress {...config} />
        </ProCard>
    );
});

export default ChartRing;
