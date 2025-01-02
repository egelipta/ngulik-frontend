// @ts-nocheck
import React, { memo, useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartColumnProps {
    data?: any[];
}

const ChartColumn = memo(({ data }: ChartColumnProps) => {

    const dummy = [
        {
            date: 'Data 1',
            val: 38,
        },
        {
            date: 'Data 2',
            val: 52,
        },
        {
            date: 'Data 3',
            val: 61,
        },
        {
            date: 'Data 4',
            val: 145,
        },
        {
            date: 'Data 5',
            val: 48,
        },
    ];

    const config = {
        isStack: true,
        data: data || dummy,
        xField: 'date',
        yField: 'val',
        label: {
            position: 'middle',
            // 'top', 'bottom', 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        style: {
            height: 150,
            width: 250
        }
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
            <Column {...config} />
        </ProCard>
    );
});

export default ChartColumn;
