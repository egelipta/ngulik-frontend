import React, { memo, useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartMultiLineProps {
    data?: any[]; // Properti opsional untuk menerima data dari luar
    stepType?: string;
}

const ChartMultiLine = memo(({ data, stepType }: ChartMultiLineProps) => {
    const dataMultiLine = [
        {
            Date: 'Jan',
            key: 'series1',
            scales: 125,
        },
        {
            Date: 'Jan',
            key: 'series2',
            scales: 51,
        },
        {
            Date: 'Feb',
            key: 'series1',
            scales: 132,
        },
        {
            Date: 'Feb',
            key: 'series2',
            scales: 91,
        },
        {
            Date: 'Mar',
            key: 'series1',
            scales: 141,
        },
        {
            Date: 'Mar',
            key: 'series2',
            scales: 34,
        },
        {
            Date: 'Apr',
            key: 'series1',
            scales: 158,
        },
        {
            Date: 'Apr',
            key: 'series2',
            scales: 47,
        },
        {
            Date: 'May',
            key: 'series1',
            scales: 133,
        },
        {
            Date: 'May',
            key: 'series2',
            scales: 63,
        },
        {
            Date: 'June',
            key: 'series1',
            scales: 143,
        },
        {
            Date: 'June',
            key: 'series2',
            scales: 58,
        },
        {
            Date: 'July',
            key: 'series1',
            scales: 176,
        },
        {
            Date: 'July',
            key: 'series2',
            scales: 56,
        },
        {
            Date: 'Aug',
            key: 'series1',
            scales: 194,
        },
        {
            Date: 'Aug',
            key: 'series2',
            scales: 77,
        },
        {
            Date: 'Sep',
            key: 'series1',
            scales: 115,
        },
        {
            Date: 'Sep',
            key: 'series2',
            scales: 99,
        },
        {
            Date: 'Oct',
            key: 'series1',
            scales: 134,
        },
        {
            Date: 'Oct',
            key: 'series2',
            scales: 106,
        },
        {
            Date: 'Nov',
            key: 'series1',
            scales: 110,
        },
        {
            Date: 'Nov',
            key: 'series2',
            scales: 88,
        },
        {
            Date: 'Dec',
            key: 'series1',
            scales: 91,
        },
        {
            Date: 'Dec',
            key: 'series2',
            scales: 56,
        },
    ];

    const config = {
        data: data || dataMultiLine,
        xField: 'Date',
        yField: 'scales',
        stepType: stepType,
        seriesField: 'key',
        legend: false,
        // xAxis: {
        //     tickCount: 5,
        // },
        style: {
            width: 250,
            height: 150,
        },
        // color: ['#1979C9', '#D62A0D', '#FAA219'],
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
            <Line {...config} />
        </ProCard>
    );
});

export default ChartMultiLine;
