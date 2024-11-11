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
        color
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
        percent: percent / 100,
        style: {
            width: size,
            height: size,
        },
        color: color,
        outline: {
            border: 4,
            distance: 2,
        },
        wave: {
            length: 128,
        },
        statistic: {
            content: {
                formatter: () => `${(percent).toFixed(0)}%`,
                style: { fontSize: '20px' }
            },
        },
    };

    return (
        <ProCard bordered className={cx(selected && styles.selectedNode)}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            title={node.data.title}
            headerBordered
            hoverable
        >
            <Liquid {...config} />
            {/* <Handle type={'source'} position={Position.Right} />
            <Handle type={'target'} position={Position.Left} /> */}
        </ProCard>
    );
};

export default ChartLiquid;