import React, { memo, useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartLineProps {
    data?: any[]; // Properti opsional untuk menerima data dari luar
}

const ChartLine = memo(({ data }: ChartLineProps) => {
    const [dataline, setDataline] = useState<any[]>([]);

    useEffect(() => {
        if (!data) {
            asyncFetch(); // Ambil data hanya jika tidak ada data yang diberikan sebagai props
        }
    }, [data]);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setDataline(json))
            .catch((error) => {
                console.error('Fetch data failed:', error);
            });
    };

    const config = {
        data: data || dataline, // Gunakan data dari props jika tersedia, atau data dari state
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
        },
        style: {
            width: 250,
            height: 150,
        },
    };

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
            <Line {...config} />
        </ProCard>
    );
});

export default ChartLine;
