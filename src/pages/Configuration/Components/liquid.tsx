import React, { memo } from 'react';
import { Liquid } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartLiquidProps {
    percent?: number;
    color?: string;
    unit?: string;
}

const ChartLiquid = memo(({ percent = 15, color = '#5B8FF9', unit = '%' }: ChartLiquidProps) => {

    // const capacity = 100;
    // const nilai = 1000;

    // const per = Math.min(percent / capacity, 1);

    const config = {
        style: {
            height: 150,
            width: 150,
        },
        color: color,
        // shape: 'rect',
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
            // title: {
            //     formatter: () => `${percent}${unit}`,
            //     style: { fontSize: '16px' },
            // },
            content: {
                formatter: () => `${percent}${unit}`,
                style: { fontWeight: 'bold', fontSize: '16px' },
            },
            // content: {
            //     formatter: () => `${percent} / ${capacity} L`,
            //     style: { fontSize: '15px', fontWeight: 'bold' },
            // },
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
