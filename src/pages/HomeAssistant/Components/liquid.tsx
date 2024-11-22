import React, { memo } from 'react';
import { Liquid } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartLiquidProps {
    percent?: number;
    color?: string;
    unit?: string;
}

const ChartLiquid = memo(({ percent = 15, color = '#5B8FF9', unit = '%' }: ChartLiquidProps) => {

    const config = {
        style: {
            height: 150,
            width: 150,
        },
        color: color,
        percent: percent / 100,
        outline: {
            border: 4,
            distance: 3,
        },
        wave: {
            length: 128,
        },
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
            <Liquid {...config} />
        </ProCard>
    );
});

export default ChartLiquid;
