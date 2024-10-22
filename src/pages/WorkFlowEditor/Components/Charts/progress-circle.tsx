import { Tiny } from '@ant-design/charts';
import ProCard from '@ant-design/pro-card';
import React, { useEffect, useState } from 'react';
import useStyles from '../../css/styles';
import { Handle, Position } from '@ant-design/pro-flow';

const ProgressCircle = (node: any) => {
    const { selected } = node;
    const { styles, cx } = useStyles();
    const [percent, setPercent] = useState(0);

    //Data random
    useEffect(() => {
        const interval = setInterval(() => {
            const randomValue = Math.random();
            setPercent(randomValue);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const roundedPercent = Math.round(percent * 100);
    const config = {
        percent,
        width: 150,
        height: 150,
        color: ['#E8EFF5', '#66AFF4'],
        annotations: [
            {
                type: 'text',
                style: {
                    text: `${roundedPercent}%`,
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 16,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return (
        <ProCard bordered className={cx(selected && styles.selectedNode)}>
            <Tiny.Ring {...config} />
            <Handle type={'source'} position={Position.Right} />
            <Handle type={'target'} position={Position.Left} />
        </ProCard>
    );
};

export default ProgressCircle;