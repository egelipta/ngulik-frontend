// @ts-nocheck
import React, { memo, useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';
import { Content } from 'antd/es/layout/layout';

interface ChartPieProps {
    data?: string[];
    innerRadius?: number;
}

const ChartPie = memo(({ data, innerRadius }: ChartPieProps) => {
    const dummy = [
        {
            key: 'Data 1',
            val: 27,
        },
        {
            key: 'Data 2',
            val: 25,
        },
        {
            key: 'Data 3',
            val: 18,
        },
    ];

    const config = {
        legend: false,
        appendPadding: 10,
        data: data || dummy,
        angleField: 'val',
        colorField: 'key',
        radius: 1,
        innerRadius: innerRadius,
        label: {
            type: 'inner',
            offset: '-50%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 10,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        style: {
            width: 150,
            height: 150
        },
        statistic: {
            title: {
                style: {
                    fontSize: 10
                }
            },
            content: {
                style: {
                    fontSize: 15,
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
            <Pie {...config} />
        </ProCard>
    );
});

export default ChartPie;
