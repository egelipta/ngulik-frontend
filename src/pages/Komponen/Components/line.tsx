// @ts-nocheck
import React, { memo } from 'react';
import { Line, Area } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartLineProps {
    data?: any[];
    smooth?: boolean;
    dType?: string;
    color?: string;
}

const ChartLine = memo(({ data, smooth, dType = 'line', color }: ChartLineProps) => {
    const dummy = [
        { date: '2010-01', val: 98 },
        { date: '2010-02', val: 50 },
        { date: '2010-03', val: 20 },
        { date: '2010-04', val: 18 },
        { date: '2010-05', val: 20 },
        { date: '2010-06', val: 82 },
        { date: '2010-07', val: 45 },
        { date: '2010-08', val: 56 },
        { date: '2010-09', val: 17 },
        { date: '2010-10', val: 40 },
        { date: '2010-11', val: 11 },
        { date: '2010-12', val: 72 },
    ];

    const config = {
        data: data || dummy,
        xField: 'date',
        yField: 'val',
        xAxis: {
            // type: 'timeCat',
            // tickCount: 5,
        },
        style: {
            height: 150,
            width: 250,
        },
        color: color,
        smooth: smooth,
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
            {/* Pilih komponen berdasarkan dType */}
            {dType === 'line' && <Line {...config} />}
            {dType === 'area' && <Area {...{ ...config, line: false }} />}
            {dType === 'line-area' && <Area {...config} />}
        </ProCard>
    );
});

export default ChartLine;
