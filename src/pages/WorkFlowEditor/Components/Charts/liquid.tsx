import { Liquid } from '@ant-design/charts';
import ProCard from '@ant-design/pro-card';
import React, { useEffect, useState } from 'react';
import useStyles from '../../css/styles';
import { Handle, Position } from '@ant-design/pro-flow';
import { dataPerangkat } from '../Datas/data';

const ChartLiquid = (node: any) => {

    const { selected } = node; // Mengambil properti selected langsung dari node
    const { data } = node; // Mengambil properti data dari node
    const { idPerangkat, size } = data;
    const { styles, cx } = useStyles();
    const [percent, setPercent] = useState(0);

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

    const config = {
        percent: percent,
        width: size,
        height: size,
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