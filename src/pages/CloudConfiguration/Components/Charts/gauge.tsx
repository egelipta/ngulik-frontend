import { Gauge } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';
import React, { useEffect, useState } from 'react';
import useStyles from '../../css/styles';
import { Handle, Position } from '@ant-design/pro-flow';
import { dataPerangkat } from '../../Datas/data';

const ChartGauge = (node: any) => {
    const { styles, cx } = useStyles();
    const { selected, data } = node; // Mengambil properti selected langsung dari node
    const [percent, setPercent] = useState(0);
    const {
        idDevice,
        size,
        color,
        min,
        max,
        batasBawah,
        batasAtas,
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

    const nilai = (percent - min) / (max - min);
    const config = {
        style: {
            width: size,
            height: size,
        },
        autoFit: true,
        percent: nilai,
        legend: false,
        range: {
            ticks: [
                0,
                (batasBawah - min) / (max - min),
                (batasAtas - min) / (max - min),
                1,
            ],
            color: color,
        },
        statistic: {
            content: {
                formatter: () => `${percent}%`,
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'grey',
                },
            },
        },
        axis: {
            label: {
                formatter: (v: string) => {
                    return (Number(v) * (max - min) + min).toFixed(0)
                },
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
            <Gauge {...config} />
            {/* <Handle type={'source'} position={Position.Right} />
            <Handle type={'target'} position={Position.Left} /> */}
        </ProCard>
    );
};

export default ChartGauge;