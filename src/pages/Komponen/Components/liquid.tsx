import React, { memo } from 'react';
import { Liquid } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartLiquidProps {
    percent?: number;
    unit?: string;
    color?: string;
    dType?: string;
    border?: number;
    distance?: number;
}

const ChartLiquid = memo(({
    //moch data pada open modal select-component
    percent = 15,
    unit = '%',
    color = '#5c91da',
    dType = 'circle',
    border = 4,
    distance = 3,
}: ChartLiquidProps) => {

    const config = {
        style: {
            height: 150,
            width: 150,
        },
        color: color,
        percent: percent / 100,
        shape: dType,
        outline: {
            border: border,
            distance: distance
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
