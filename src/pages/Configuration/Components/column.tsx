import React, { memo, useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartColumnProps {
    data?: any[];
}

const ChartColumn = memo(({ data }: ChartColumnProps) => {
    const datanya = [
        {
            Date: 'D1',
            scales: 38,
        },
        {
            Date: 'D2',
            scales: 52,
        },
        {
            Date: 'D3',
            scales: 61,
        },
        {
            Date: 'D4',
            scales: 145,
        },
        {
            Date: 'D5',
            scales: 48,
        },
    ];

    const config = {
        data: data || datanya,
        xField: 'Date',
        yField: 'scales',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            Date: {
                alias: '类别',
            },
            scales: {
                alias: 'Jumlah',
            },
        },
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
            <Column {...config} />
        </ProCard>
    );
});

export default ChartColumn;
