import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Affix, Button, Col, Dropdown, Input, message, Popconfirm, Row, Typography } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import './CSS/style.css';

import {
    getAllDataApiV1HomeAssistantHomeassistantGetDataGet,
    homeAssistantDelApiV1HomeAssistantHomeassistantDelDataDelete
} from '@/services/pjvms/homeAssistant';
import { dataTunggal, dataMultiLine, dataLine, dataPie, dataColumn } from './Datas/data';
import { EditOutlined, DeleteOutlined, EllipsisOutlined, FileAddOutlined } from '@ant-design/icons';

import exportComponent from './Components/exportComponents';
import SelectComponent from './Action/select-component';
import EditComponent from './Action/edit-component';

export default memo(() => {
    const { Text } = Typography;
    const [selectVisible, setSelectVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editSelectedData, setEditSelectedData] = useState<any>(null);

    const [data, setData] = useState<any>([]);
    const breakpointColumns = {
        default: 4,
        1600: 3,
        1200: 2,
        700: 1,
    };

    const getData = async () => {
        try {
            const response = await getAllDataApiV1HomeAssistantHomeassistantGetDataGet();
            setData(response);
            // console.log('DATAPENTING: ', response)
        } catch (error) {
            message.error('Failed to fetch data from API'); // Tampilkan pesan error
        }
    };

    const deleteData = async (value: API.homeAssistantDelApiV1HomeAssistantHomeassistantDelDataDeleteParams) => {
        try {
            const result = await homeAssistantDelApiV1HomeAssistantHomeassistantDelDataDelete({ id: value.id });
            if (result.code === 200) {
                message.success(result.message);
                getData();
            } else {
                message.error(result.message);
            }
        } catch (error) {
            message.error('Failed to delete data');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const reloadPage = () => {
        getData();
    };

    const handleSearch = (inputName: string) => {
        if (!inputName) {
            // Jika tidak ada query, ambil ulang semua data
            getData();
            return;
        }

        setData((prevData: any[]) =>
            prevData.filter((item: any) =>
                item.datachart.name.toLowerCase().includes(inputName.toLowerCase())
            )
        );
    };

    const renderChart = (
        perangkatID: number,
        tipe: string,
        dataConfig: any,
    ) => {

        const singleValue = dataTunggal.find((dt) => dt.id === perangkatID);
        const multiLine = dataMultiLine.find((dml) => dml.id === perangkatID);
        const lineValue = dataLine.find((dl) => dl.id === perangkatID);
        const pieValue = dataPie.find((dp) => dp.id === perangkatID);
        const columnValue = dataColumn.find((dc) => dc.id === perangkatID);

        const ChartComponent = exportComponent.theComponent[tipe];
        if (!ChartComponent) {
            return <div>Unknown component tipe</div>;
        }

        const getChartData = (tipe: string, values: any) => {
            switch (tipe) {
                case 'ChartGauge':
                case 'ChartLiquid':
                case 'ChartRing':
                    return { percent: values.singleValue?.value };
                case 'ChartLine':
                    return { data: values.lineValue?.value };
                case 'ChartMultiLine':
                    return { data: values.multiLine?.value };
                case 'ChartPie':
                    return { data: values.pieValue?.value };
                case 'ChartColumn':
                    return { data: values.columnValue?.value };
                default:
                    return null;
            }
        };

        return (
            <ChartComponent
                {...getChartData(tipe, { singleValue, multiLine, lineValue, pieValue, columnValue })}
                {...dataConfig}
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
                        // onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                        addonBefore={[
                            <Button type="primary" size="small" onClick={() => setSelectVisible(true)}>
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
                {data.map((d: any) => (
                    <ProCard
                        bordered
                        bodyStyle={{ backgroundColor: '#fafafa' }}
                        key={d.id}
                        title={[<Text strong>{d.datachart.name}</Text>]}
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
                                            onClick: () => {
                                                setEditSelectedData(d);
                                                setEditVisible(true);
                                            },
                                        },
                                        {
                                            key: '2',
                                            label: <Popconfirm
                                                key={'delete'}
                                                title="Anda yakin?"
                                                onConfirm={() => deleteData(d)}
                                                placement="leftTop"
                                            >
                                                <a style={{ color: 'red' }} ><DeleteOutlined /> Delete</a>
                                            </Popconfirm>
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
                            d.datachart.devid,
                            d.datachart.type,
                            d.datachart.dataconfig
                        )}
                    </ProCard>
                ))}
            </Masonry>

            <SelectComponent
                visible={selectVisible}
                onClose={() => setSelectVisible(false)}
                reload={reloadPage}
            />

            <EditComponent
                visible={editVisible}
                onClose={() => setEditVisible(false)}
                dataSelected={editSelectedData}
                reload={reloadPage} />
        </PageContainer>
    );
});
