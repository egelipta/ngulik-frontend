import { Gauge } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';
import React, { useEffect, useState } from 'react';
import useStyles from '../../css/styles';
import { Handle, Position } from '@ant-design/pro-flow';

const ChartGauge = (node: any) => {
    const { selected } = node;
    const { styles, cx } = useStyles();
    const [percent, setPercent] = useState(0);

    //Data random
    useEffect(() => {
        const interval = setInterval(() => {
            const randomValue = Math.random();
            setPercent(randomValue);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const config = {
        width: 150,
        height: 150,
        autoFit: true,
        percent,
        legend: false,
        range: {
            ticks: [0, 0.3, 0.5, 1],
            color: ['#52c41a', '#faad14', '#f5222d'],
        },
        statistic: {
            content: {
                formatter: () => `${Math.floor(percent * 100)}%`,
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'grey',
                },
            },
        },
        axis: {
            label: {
                formatter: (value: string) => {
                    return `${Number(value) * 100}`;
                },
                // style: {
                //     fontSize: 20,
                //     // fill: '#000',
                // },
            },
        },
    };

    return (
        <ProCard bordered className={cx(selected && styles.selectedNode)}>
            <Gauge {...config} />
            <Handle type={'source'} position={Position.Right} />
            <Handle type={'target'} position={Position.Left} />
        </ProCard>
    );
};

export default ChartGauge;