import React, { useEffect, useRef, memo, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import panzoomify from 'panzoomify';
import './style.css';
import { Space, Tooltip, Modal, Drawer, Descriptions } from 'antd';
import { getHeatmapLantai2ListApiV1HeatMapHeatMapHeatMapLantai2Get } from '@/services/pjvms/heatMap';
import { useIntl } from '@umijs/max';

export default memo(() => {
    const intl = useIntl();

    const sceneRef = useRef(null);
    const [datas, setData] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);

    const getData = async () => {
        try {
            const response = await getHeatmapLantai2ListApiV1HeatMapHeatMapHeatMapLantai2Get();
            setData(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 101);
    };

    useEffect(() => {
        if (sceneRef.current) {
            panzoomify(sceneRef.current);
        }
    }, []);

    const getFill = (id: string) => {
        const data = datas.find((data) => data.id === id);
        if (data) {
            const { nilai } = data;
            if (nilai === 0) return '#eee';
            if (nilai <= 25) return '#ddd';
            if (nilai <= 50) return '#ccc';
            if (nilai <= 75) return '#bbb';
            if (nilai <= 100) return '#aaa';
        }
        return '#eee';
    };

    const handleClick = (data: any) => {
        setSelectedData(data);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedData(null);
    };

    const getLabelPosition = (d: string) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        const length = path.getTotalLength();
        const midpoint = path.getPointAtLength(length / 3);
        return { x: midpoint.x - 1, y: midpoint.y };
    };

    const formatLabel = (label: string) => {
        const words = label.split(' ');
        const lines = [];
        for (let i = 0; i < words.length; i += 1) {
            lines.push(words.slice(i, i + 1).join(' '));
        }
        return lines;
    };

    return (
        <>
            <ProCard>
                <div style={{ width: '100%', height: '600px' }}>
                    <svg
                        id="eGlH3Dmoyj91"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1632 844"
                        shapeRendering="geometricPrecision"
                        textRendering="geometricPrecision"
                        style={{ width: '100%', height: '100%' }}
                    >
                        <g id="scene" ref={sceneRef} className="no-highlight">
                            {datas.map((data) => (
                                <>
                                    <Tooltip
                                        arrow={false}
                                        title={
                                            <Space>
                                                <img src={`https://randomuser.me/api/portraits/men/${getRandomNumber()}.jpg`} alt="Tooltip" style={{ width: '60px', height: '60px' }} />
                                                <p>{data.nama}</p>
                                            </Space>
                                        }
                                        key={data.id}
                                    >
                                        <path
                                            onClick={() => handleClick(data)}
                                            id={data.id}
                                            d={data.d}
                                            className="hoverable"
                                            fill={getFill(data.id)}
                                            strokeWidth="3.264"
                                        />
                                    </Tooltip>
                                    <text
                                        x={getLabelPosition(data.d).x}
                                        y={getLabelPosition(data.d).y}
                                        textAnchor="end"
                                        alignmentBaseline="hanging"
                                        style={{ pointerEvents: 'none', fontSize: '6px', fill: 'black' }}
                                    >
                                        {formatLabel(data.nama).map((line, index) => (
                                            <tspan x={getLabelPosition(data.d).x} dy={index === 0 ? '1em' : '1em'} key={index}>
                                                {line}
                                            </tspan>
                                        ))}
                                    </text>
                                </>
                            ))}
                        </g>
                    </svg>
                </div>
            </ProCard>

            <Drawer
                width={'40%'}
                title={intl.formatMessage({
                    id: 'pages.heat-map.room-detail',
                })}
                open={isModalVisible}
                onClose={handleModalClose}
                footer={null}
            >
                {selectedData && (
                    <Descriptions column={1} bordered size='small'>
                        <Descriptions.Item label="Nama">{selectedData.nama}</Descriptions.Item>
                        <Descriptions.Item label="Nilai">{selectedData.nilai}</Descriptions.Item>
                        <Descriptions.Item label="Koordinat">{selectedData.d}</Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
});
