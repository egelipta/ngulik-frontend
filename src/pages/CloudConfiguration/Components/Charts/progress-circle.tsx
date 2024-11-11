import { Tiny } from '@ant-design/charts';
import ProCard from '@ant-design/pro-card';
import React, { useEffect, useState } from 'react';
import useStyles from '../../css/styles';
import { Handle, Position } from '@ant-design/pro-flow';
import { dataPerangkat } from '../../Datas/data';

const ProgressCircle = (node: any) => {
    const { styles, cx } = useStyles();
    const { selected, data } = node; // Mengambil properti selected langsung dari node
    const [percent, setPercent] = useState(0);
    const {
        idDevice,
        size,
        color
    } = data;

    // Memperbarui persen berdasarkan idDevice(id) dari dataPerangkat
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

    const roundedPercent = Math.round(percent);

    // Memodifikasi nilai agar tidak tampil putih polos jika persen bernilai 0
    const modifNilai = percent === 0 ? 0.0001 : percent;

    // Menggunakan nilai size untuk lebar dan tinggi, dengan nilai default 150
    const chartSize = size || 150;

    const config = {
        percent: modifNilai / 100,
        width: chartSize,
        height: chartSize,
        color: color,
        annotations: [
            {
                type: 'text',
                style: {
                    text: `${roundedPercent}%`,
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 20,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return (
        <ProCard bordered className={cx(selected && styles.selectedNode)}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            title={node.data.title}
            headerBordered
            hoverable
        >
            <Tiny.Ring {...config} />
            {/* <Handle type={'source'} position={Position.Right} />
            <Handle type={'target'} position={Position.Left} /> */}
        </ProCard>
    );
};

export default ProgressCircle;
