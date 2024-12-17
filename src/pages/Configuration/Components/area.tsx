import React, { memo, useEffect, useState } from 'react';
import { Area } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

interface ChartAreaProps {
    data?: any[];
}

const ChartArea = memo(({ data }: ChartAreaProps) => {
    const [dataArea, setDataline] = useState<any[]>([]);

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
        data: data || dataArea,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            range: [0, 1],
        },
        style: {
            width: 250,
            height: 150,
        },
        // areaStyle: () => {
        //     return {
        //         fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
        //     };
        // },
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
            <Area {...config} />
        </ProCard>
    );
});

export default ChartArea;
