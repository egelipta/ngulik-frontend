import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Affix, Button, Dropdown, Input, MenuProps, message, Typography } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import '../CloudConfiguration/css/style.css';
import SelectComponent from './View/select-component';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, FileAddOutlined } from '@ant-design/icons';
import ChartGauge from './Components/gauge';
import ChartLiquid from './Components/liquid';
import ChartRing from './Components/ring';
import ChartLine from './Components/line';
import Texts from './Components/text';
import ChartPie from './Components/pie';
import ChartStatistic from './Components/statistic-card';
import { getAllDataApiV1HomeAssistantHomeassistantGetDataGet } from '@/services/pjvms/homeAssistant';
import { dataTunggal, dataLine, dataPie } from './datas';

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
        ChartPie,
    };

    const renderChart = (devid: number, type: string, unit: string, datas: any) => {
        // Mencari data perangkat berdasarkan devid dari dataTunggal
        const device = dataTunggal.find((dp) => dp.id === devid); //struktur data tunggal
        const deviceLine = dataLine.find((dp) => dp.id === devid); //struktur data array
        const devicePie = dataPie.find((dp) => dp.id === devid); //struktur data array

        // Jika tidak ditemukan data yang sesuai, tampilkan pesan error
        if (!device && type === 'ChartGauge') {
            return <div>Device data for ChartGauge not found</div>;
        }

        if (!deviceLine && type === 'ChartLine') {
            return <div>Device data for ChartLine not found</div>;
        }

        if (!devicePie && type === 'ChartPie') {
            return <div>Device data for ChartPie not found</div>;
        }

        // Menemukan komponen chart yang sesuai
        const ChartComponent = chartComponents[type];
        if (!ChartComponent) {
            return <div>Unknown component type</div>;
        }

        // Kirimkan data ke komponen chart
        return (
            <ChartComponent
                {...(type === 'ChartLine'
                    ? { data: deviceLine?.value } // jika Line gunakan prop 'data'
                    : type === 'ChartPie'
                        ? { data: devicePie?.value } // jika Pie gunakan prop 'data'
                        : { percent: device?.value })} // jika Gauge, Liquid, Ring gunakan prop 'percent'
                unit={unit}
                {...datas}
            />
        );
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
                        extra={[
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: '1',
                                            label: <a><EditOutlined /> Edit</a>,
                                            onClick: () => console.log(`Edit ${dt.id}`),
                                        },
                                        {
                                            key: '2',
                                            label: <a><DeleteOutlined /> Delete</a>,
                                            onClick: () => console.log(`Delete ${dt.id}`),
                                        },
                                    ],
                                }}
                                trigger={['click']}
                            >
                                <EllipsisOutlined style={{ fontSize: '20px' }} />
                            </Dropdown>
                        ]}
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
