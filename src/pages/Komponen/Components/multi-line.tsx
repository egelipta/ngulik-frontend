// @ts-nocheck
import React, { memo, useEffect, useState } from 'react';
import { Line, Area } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartMultiLineProps {
    data?: any[]; // Properti opsional untuk menerima data dari luar
    dType?: string;
    color?: string[];
    smooth?: boolean;
}

const ChartMultiLine = memo(({
    data,
    smooth,
    dType = "line",
    color = [
        "#4accf4",
        "#0abc21",
    ] }: ChartMultiLineProps) => {
    const moch = [{ "date": "Jan", "key": "Data 1", "val": 125 }, { "date": "Jan", "key": "Data 2", "val": 51 }, { "date": "Feb", "key": "Data 1", "val": 132 }, { "date": "Feb", "key": "Data 2", "val": 91 }, { "date": "Mar", "key": "Data 1", "val": 141 }, { "date": "Mar", "key": "Data 2", "val": 34 }, { "date": "Apr", "key": "Data 1", "val": 158 }, { "date": "Apr", "key": "Data 2", "val": 47 }, { "date": "May", "key": "Data 1", "val": 133 }, { "date": "May", "key": "Data 2", "val": 63 }, { "date": "June", "key": "Data 1", "val": 143 }, { "date": "June", "key": "Data 2", "val": 58 }, { "date": "July", "key": "Data 1", "val": 176 }, { "date": "July", "key": "Data 2", "val": 56 }, { "date": "Aug", "key": "Data 1", "val": 194 }, { "date": "Aug", "key": "Data 2", "val": 77 }, { "date": "Sep", "key": "Data 1", "val": 115 }, { "date": "Sep", "key": "Data 2", "val": 99 }, { "date": "Oct", "key": "Data 1", "val": 134 }, { "date": "Oct", "key": "Data 2", "val": 106 }, { "date": "Nov", "key": "Data 1", "val": 110 }, { "date": "Nov", "key": "Data 2", "val": 88 }, { "date": "Dec", "key": "Data 1", "val": 91 }, { "date": "Dec", "key": "Data 2", "val": 56 }];

    const config = {
        data: data || moch,
        xField: 'date',
        yField: 'val',
        seriesField: 'key',
        legend: false,
        // xAxis: {
        //     tickCount: 5,
        // },
        style: {
            width: 250,
            height: 150,
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

export default ChartMultiLine;
