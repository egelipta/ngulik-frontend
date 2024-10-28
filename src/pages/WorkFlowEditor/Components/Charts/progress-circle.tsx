import { Tiny } from '@ant-design/charts';
import ProCard from '@ant-design/pro-card';
import React, { useEffect, useState } from 'react';
import useStyles from '../../css/styles';
import { Handle, Position } from '@ant-design/pro-flow';
import { dataPerangkat } from '../Datas/data';

const ProgressCircle = (node: any) => {
    const { selected } = node; // Mengambil properti selected langsung dari node
    const { data } = node; // Mengambil properti data dari node
    const { idPerangkat, size } = data;
    const { styles, cx } = useStyles();
    const [percent, setPercent] = useState(0);

    // Memperbarui persen berdasarkan idPerangkat(id) dari dataPerangkat
    useEffect(() => {
        if (idPerangkat != null) {
            // Mencari data idPerangkat berdasarkan id dan nilai sebagai percent
            const idPerangkatData = dataPerangkat.find((dp) => dp.id === idPerangkat);
            if (idPerangkatData) {
                setPercent(idPerangkatData.nilai);
            } else {
                setPercent(0); // default ke 0 jika idPerangkat tidak ditemukan
            }
        }
    }, [idPerangkat]);

    const roundedPercent = Math.round(percent * 100);

    // Memodifikasi nilai agar tidak tampil putih polos jika persen bernilai 0
    const modifNilai = percent === 0 ? 0.0001 : percent;

    // Menggunakan nilai size untuk lebar dan tinggi, dengan nilai default 150
    const chartSize = size || 150;

    const config = {
        percent: modifNilai,
        width: chartSize,
        height: chartSize,
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
