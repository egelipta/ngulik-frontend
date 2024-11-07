import { Liquid } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';
import React, { useEffect, useState } from 'react';
import useStyles from '../../css/styles';
import { Handle, Position } from '@ant-design/pro-flow';
import { dataPerangkat } from '../../Datas/data';

const ChartLiquid = (node: any) => {
    const { styles, cx } = useStyles();
    const { selected, data } = node; // Mengambil properti selected langsung dari node
    const [percent, setPercent] = useState(0);
    const {
        idDevice,
        size,
        colorLiquid
    } = data;

    useEffect(() => {
        if (idDevice != null) {
            // Mencari data idDevice berdasarkan id dan nilai sebagai percent
            const idDeviceData = dataPerangkat.find((dp) => dp.id === idDevice);
            if (idDeviceData) {
                setPercent(idDeviceData.nilai);
            } else {
                setPercent(0); // default ke 0 jika idDevice tidak ditemukan
            }
        }
    }, [idDevice]);

    const config = {
        percent: percent,
        style: {
            width: size,
            height: size,
        },
        color: colorLiquid,
        outline: {
            border: 5,
            distance: 8,
        },
        wave: {
            length: 128,
        },
        statistic: {
            content: {
                formatter: () => `${(percent * 100).toFixed(0)}%`,
            },
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