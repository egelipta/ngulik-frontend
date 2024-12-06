import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Affix, Button, Col, Dropdown, Input, message, Popconfirm, Row, Typography } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import './CSS/style.css';

import {
    getAllDataApiV1HomeAssistantHomeassistantGetDataGet,
    homeAssistantDelApiV1HomeAssistantHomeassistantDelDataDelete
} from '@/services/pjvms/homeAssistant';
import { dataTunggal, dataLine, dataPie } from './Datas/data';

import TheComponent from './Components/theComponent';
import SelectComponent from './View/select-component';
import EditComponent from './View/edit-component';
import { EditOutlined, DeleteOutlined, EllipsisOutlined, FileAddOutlined } from '@ant-design/icons';


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

    const renderChart = (
        perangkatID: number,
        tipe: string,
        satuan: string,
        dataData: any
    ) => {

        const singleValue = dataTunggal.find((dt) => dt.id === perangkatID);
        const lineValue = dataLine.find((dl) => dl.id === perangkatID);
        const pieValue = dataPie.find((dp) => dp.id === perangkatID);

        // if (!singleValue && tipe === 'ChartGauge') {
        //     return <div>Device data for ChartGauge not found</div>;
        // }

        const ChartComponent = TheComponent[tipe];
        if (!ChartComponent) {
            return <div>Unknown component tipe</div>;
        }

        return (
            <ChartComponent
                {...(tipe === 'ChartLine'
                    ? { data: lineValue?.value }
                    : tipe === 'ChartPie'
                        ? { data: pieValue?.value }
                        : { percent: singleValue?.value })
                }
                unit={satuan}
                {...dataData}
            />
        );
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
                                                <a><DeleteOutlined /> Delete</a>
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
                            d.datachart.devid, //perangkatID
                            d.datachart.type, //tipe
                            d.datachart.unit, //satuan
                            d.datachart.datas //dataData
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
                // SelectedComponent={editSelectedData}
                dataSelected={editSelectedData}
                reload={reloadPage}
            />
        </PageContainer>
    );
});
