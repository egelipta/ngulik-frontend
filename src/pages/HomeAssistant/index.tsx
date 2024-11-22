import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Affix, Button, Input, Statistic, Typography } from 'antd';
import React, { memo, useState } from 'react';
import Masonry from 'react-masonry-css';
import '../CloudConfiguration/css/style.css';
import SelectComponent from './View/select-component';
import { FileAddOutlined } from '@ant-design/icons';
import { chartData } from './datas';
import ChartGauge from './Components/gauge';
import ChartLiquid from './Components/liquid';
import ChartRing from './Components/ring';
import Texts from './Components/text';
import ChartStatistic from './Components/statistic-card';

export default memo(() => {
    const { Text } = Typography;
    const [selectComponentVisible, setSelectComponentVisible] = useState(false);

    const breakpointColumns = {
        default: 4,
        1600: 3,
        1200: 2,
        700: 1,
    };

    const chartComponents: Record<string, React.FC<any>> = {
        ChartGauge,
        ChartLiquid,
        ChartRing,
        Texts,
        ChartStatistic,
    };

    const renderChart = (percent: number, type: string, unit: string, data: any) => {
        const ChartComponent = chartComponents[type];
        if (!ChartComponent) return <div>Unknown chart type</div>;
        return <ChartComponent percent={percent} unit={unit} {...data} />;
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
                {chartData.map((dt, index) => (
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
                            dt.datachart.percent,
                            dt.datachart.type,
                            dt.datachart.unit,
                            dt.datachart.data
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
