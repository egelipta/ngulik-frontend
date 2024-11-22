import React, { memo, useState } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import { Row, Col, Affix, Divider, Input, Typography } from 'antd';
import ProCard from '@ant-design/pro-card';

import ChartGauge from '../Components/gauge';
import ChartLine from '../Components/line';
import ChartLiquid from '../Components/liquid';
import ChartPie from '../Components/pie';
import ChartRing from '../Components/ring';
import Image from '../Components/image';
import Texts from '../Components/text';
import ChartStatistic from '../Components/statistic-card';

import AddComponent from './add-component';

const chartTypes: Record<string, React.ElementType> = {
    ChartGauge,
    ChartLine,
    ChartLiquid,
    ChartPie,
    ChartRing,
    ChartStatistic,
    Image,
    Texts,
};

const SelectComponent = memo(({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const { Text } = Typography;
    const [search, setSearch] = useState<string>('');
    const [addComponentVisible, setAddComponentVisible] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState<{ name: string; component: React.ElementType } | null>(null);

    const filteredChartTypes = Object.entries(chartTypes).filter(([key]) =>
        key.toLowerCase().includes(search.toLowerCase())
    );

    const handleComponentClick = (name: string, Component: React.ElementType) => {
        setSelectedComponent({ name, component: Component });
        setAddComponentVisible(true);
        onClose();
    };

    return (
        <>
            <ModalForm
                width={1000}
                title="Select Component"
                open={visible}
                submitter={false}
                modalProps={{
                    destroyOnClose: true,
                    maskClosable: false,
                    onCancel: onClose,
                }}
            >
                <Row>
                    <Col xxl={24} xs={24}>
                        <Affix offsetTop={55}>
                            <Input.Search
                                size="large"
                                enterButton
                                placeholder="Search Components..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Affix>
                    </Col>
                </Row>
                <Divider />
                <div style={{ height: '520px', overflowY: 'auto', padding: '10px' }}>
                    <Row gutter={[16, 16]}>
                        {filteredChartTypes.map(([key, Component]) => (
                            <Col xxl={8} xl={8} md={12} sm={12} xs={24} key={key}>
                                <ProCard
                                    hoverable
                                    headerBordered
                                    title={[<Text strong>{key}</Text>]}
                                    // title={key}
                                    bordered
                                    size="small"
                                    bodyStyle={{
                                        backgroundColor: '#fafafa',
                                    }}
                                    onClick={() => handleComponentClick(key, Component)}
                                >
                                    <Component />
                                </ProCard>
                            </Col>
                        ))}
                    </Row>
                </div>
            </ModalForm>

            <AddComponent
                visible={addComponentVisible}
                onClose={() => setAddComponentVisible(false)}
                SelectedComponent={selectedComponent}
            />
        </>
    );
});

export default SelectComponent;
