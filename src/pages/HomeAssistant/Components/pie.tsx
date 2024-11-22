import React, { memo } from 'react';
import { Pie } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

const ChartPie = memo(() => {
    const data = [
        {
            type: 'Data 1',
            value: 27,
        },
        {
            type: 'Data 2',
            value: 25,
        },
        {
            type: 'Data 3',
            value: 18,
        },
        {
            type: 'Data 4',
            value: 15,
        },
        {
            type: 'Data 5',
            value: 10,
        },
        {
            type: 'Data 6',
            value: 5,
        },
    ];
    const config = {
        style: {
            width: 150,
            height: 150
        },
        legend: false,
        appendPadding: 0,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: undefined,
        // label: {
        //     type: 'spider',
        //     labelHeight: 28,
        //     content: '{name}\n{percentage}',
        // },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    }

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
