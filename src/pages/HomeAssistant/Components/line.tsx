import React, { memo, useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import ProCard from '@ant-design/pro-card';

const ChartLine = memo(() => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const config = {
        data: data,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
        },
        style: {
            width: 250,
            height: 150
        }
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
