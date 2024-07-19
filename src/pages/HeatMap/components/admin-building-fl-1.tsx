//lantai1.tsx

import React, { useEffect, useRef, memo, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import panzoomify from 'panzoomify';
import './style.css';
import { Tooltip } from 'antd';
import { getHeatmapLantai1ListApiV1HeatMapHeatMapHeatMapLantai1Get } from '@/services/pjvms/heatMap'

export default memo(() => {
    const sceneRef = useRef(null);
    const [datas, setData] = useState<any[]>([]);

    const getData = async () => {
        try {
            const response = await getHeatmapLantai1ListApiV1HeatMapHeatMapHeatMapLantai1Get();
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

    const getTooltip = (id: string) => {
        const data = datas.find((data: { id: string }) => data.id === id);
        // return data ? data.nama + ' ' + '(' + data.nilai + 'x Kunjungan)' : '';
        return data ? data.nama : '';
    };

    return (
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
                            <Tooltip arrow={false} title={getTooltip(data.id)}>
                                <path
                                    id={data.id}
                                    d={data.d}
                                    className="hoverable"
                                    fill={getFill(data.id)}
                                    strokeWidth="3.264"
                                />
                            </Tooltip>
                            //     <Tooltip
                            //     arrow={false}
                            //     title={
                            //         <div>
                            //             <img src="https://randomuser.me/api/portraits/men/78.jpg" alt="Tooltip" style={{ width: '100px', height: '100px' }} />
                            //             <p>{data.nama}</p>
                            //         </div>
                            //     }
                            // >
                            //     <path
                            //         id={data.id}
                            //         d={data.d}
                            //         className="hoverable"
                            //         fill={getFill(data.id)}
                            //         stroke-width="3.264"
                            //     />
                            // </Tooltip>
                        ))}
                    </g>
                </svg>
            </div>
        </ProCard>
    );
});
