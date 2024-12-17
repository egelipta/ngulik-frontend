import React, { memo, useEffect, useState } from 'react';
import { Radar } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartRadarProps {
    data?: any[];
}

const ChartRadar = memo(({ data }: ChartRadarProps) => {
    const datanya = [
        { "label": "D1", "key": "a", "scales": 70 },
        { "label": "D1", "key": "b", "scales": 30 },
        { "label": "D2", "key": "a", "scales": 60 },
        { "label": "D2", "key": "b", "scales": 70 },
        { "label": "D3", "key": "a", "scales": 50 },
        { "label": "D3", "key": "b", "scales": 60 },
        { "label": "D4", "key": "a", "scales": 40 },
        { "label": "D4", "key": "b", "scales": 50 },
        { "label": "D5", "key": "a", "scales": 60 },
        { "label": "D5", "key": "b", "scales": 70 },
        { "label": "D6", "key": "a", "scales": 70 },
        { "label": "D6", "key": "b", "scales": 50 },
    ]

    const config = {
        data: data?.map((d) => ({ ...d, star: Math.sqrt(d.scales) })) || datanya.map((d) => ({ ...d, star: Math.sqrt(d.scales) })),
        xField: 'label',
        yField: 'star',
        seriesField: 'key',
        appendPadding: [0, 10, 0, 10],
        legend: false,
        meta: {
            star: {
                // alias: 'Value',
                min: 0,
                nice: true,
                formatter: (v: any) => Number(v).toFixed(2),
            },
        },
        xAxis: {
            tickLine: null,
        },
        yAxis: {
            label: false,
            grid: {
                alternateColor: 'rgba(0, 0, 255, 0.04)'
            },
        },
        // 开启辅助点
        point: {
            size: 2,
        },
        area: {},
        style: {
            width: 250,
            height: 150,
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
            <Radar {...config} />
        </ProCard>
    );
});

export default ChartRadar;
