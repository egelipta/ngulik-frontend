import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Affix, Button, Input, message, Statistic, Typography } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import '../CloudConfiguration/css/style.css';
import SelectComponent from './View/select-component';
import { FileAddOutlined } from '@ant-design/icons';
import ChartGauge from './Components/gauge';
import ChartLiquid from './Components/liquid';
import ChartRing from './Components/ring';
import ChartLine from './Components/line';
import Texts from './Components/text';
import ChartStatistic from './Components/statistic-card';
import { getAllDataApiV1HomeAssistantHomeassistantGetDataGet } from '@/services/pjvms/homeAssistant';
import { deviceData } from './datas';

export default memo(() => {
    const { Text } = Typography;
    const [selectComponentVisible, setSelectComponentVisible] = useState(false);

    const breakpointColumns = {
        default: 4,
        1600: 3,
        1200: 2,
        700: 1,
    };

    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllDataApiV1HomeAssistantHomeassistantGetDataGet();
                setData(response);
                console.log('DATAPENTING: ', response)
            } catch (error) {
                message.error('Failed to fetch data from API'); // Tampilkan pesan error
            }
        };

        fetchData();
    }, []);


    const chartComponents: Record<string, React.FC<any>> = {
        ChartGauge,
        ChartLiquid,
        ChartRing,
        Texts,
        ChartStatistic,
        ChartLine,
    };

    const renderChart = (devid: number, type: string, unit: string, datas: any) => {
        // Mencari data perangkat berdasarkan devid dari deviceData
        const device = deviceData.find((dp) => dp.id === devid);
        if (!device) return <div>Device not found</div>; // Menangani jika perangkat tidak ditemukan

        // Dapatkan nilai perangkat yang sesuai
        const deviceValue = device.value;
        // console.log('device value: ', deviceValue)

        // Temukan komponen chart yang sesuai
        const ChartComponent = chartComponents[type];
        if (!ChartComponent) return <div>Unknown component type</div>;

        // Kirimkan data dan nilai perangkat ke chart component
        return <ChartComponent percent={deviceValue} unit={unit} {...datas} />;
    };


    return (
        <PageContainer>
            <Affix offsetTop={55}>
                <ProCard bordered>
                    <Input.Search
                        size="large"
                        enterButton
                        placeholder="Search..."
                        addonBefore={[
                            <Button type="primary" size="small" onClick={() => setSelectComponentVisible(true)}>
                                <FileAddOutlined /> Add
                            </Button>,
                        ]}
                    />
                </ProCard>
            </Affix>
            <br />
            <Masonry
                breakpointCols={breakpointColumns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                style={{ paddingLeft: 10 }}
            >
                {data.map((dt: any, index: number) => (
                    <ProCard
                        bordered
                        bodyStyle={{ backgroundColor: '#fafafa' }}
                        key={index}
                        title={[<Text strong>{dt.datachart.name}</Text>]}
                        headerBordered
                        size="small"
                        hoverable
                    >
                        {renderChart(
                            dt.datachart.devid,
                            dt.datachart.type,
                            dt.datachart.unit,
                            dt.datachart.datas
                        )}
                    </ProCard>
                ))}

            </Masonry>

            <SelectComponent
                visible={selectComponentVisible}
                onClose={() => setSelectComponentVisible(false)}
            />
        </PageContainer>
    );
});
