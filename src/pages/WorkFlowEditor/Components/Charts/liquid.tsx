import { Liquid } from '@ant-design/charts';
import ProCard from '@ant-design/pro-card';
import React from 'react';
import useStyles from '../../css/styles';
import { Handle, Position } from '@ant-design/pro-flow';

const ChartLiquid = (node: any) => {
    const { selected } = node;
    const { styles, cx } = useStyles();
    const config = {
        percent: 0.24,
        width: 180,
        height: 180,
        style: {
            outlineBorder: 4,
            outlineDistance: 8,
            waveLength: 128,
        },
    };

    return (
        <ProCard bordered className={cx(selected && styles.selectedNode)}>
            <Liquid {...config} />
            <Handle type={'source'} position={Position.Right} />
            <Handle type={'target'} position={Position.Left} />
        </ProCard>
    );
};

export default ChartLiquid;