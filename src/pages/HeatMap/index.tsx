
import React, { memo, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Flex, Row, Space } from 'antd';

import ABuildingFL1 from './components/admin-building-fl-1'
import ABuildingFL2 from './components/admin-building-fl-2'
import { FormattedMessage } from '@umijs/max';
// import ABuildingFL3 from './components/admin-building-fl-3'
// import DCBuildingL1 from './components/dc-building-fl-1'
// import Lantaix from './components/lantaix'

export default memo(() => {
    const [activeContent, setActiveContent] = useState('admin-building-fl-1');

    const handleButtonClick = (contentKey: any) => {
        setActiveContent(contentKey);
    };

    return (
        <PageContainer>
            <Row gutter={[5, 5]}>
                <Col xxl={24} xs={24}>
                    <ProCard>
                        <Flex wrap gap="small" justify='center'>
                            <Button
                                onClick={() => handleButtonClick('admin-building-fl-1')}
                                type={activeContent === 'admin-building-fl-1' ? 'primary' : 'default'}
                            >
                                <FormattedMessage id='pages.heat-map.floor1' />
                            </Button>
                            <Button
                                onClick={() => handleButtonClick('admin-building-fl-2')}
                                type={activeContent === 'admin-building-fl-2' ? 'primary' : 'default'}
                            >
                                <FormattedMessage id='pages.heat-map.floor2' />
                            </Button>
                            {/* <Button
                                onClick={() => handleButtonClick('admin-building-fl-3')}
                                type={activeContent === 'admin-building-fl-3' ? 'primary' : 'default'}
                            >
                                Admin Building FL3
                            </Button>
                            <Button
                                onClick={() => handleButtonClick('dc-building-fl-1')}
                                type={activeContent === 'dc-building-fl-1' ? 'primary' : 'default'}
                            >
                                DC Building FL1
                            </Button>
                            <Button
                                onClick={() => handleButtonClick('lantaix')}
                                type={activeContent === 'lantaix' ? 'primary' : 'default'}
                            >
                                Lantai X
                            </Button> */}
                        </Flex>
                    </ProCard>
                </Col>
                <Col xxl={24} xs={24}>
                    {/* Menampilkan konten berdasarkan tombol yang diklik */}
                    {activeContent === 'admin-building-fl-1' && (
                        <ProCard>
                            <ABuildingFL1 />
                        </ProCard>
                    )}
                    {activeContent === 'admin-building-fl-2' && (
                        <ProCard>
                            <ABuildingFL2 />
                        </ProCard>
                    )}
                    {/* {activeContent === 'admin-building-fl-3' && (
                        <ProCard>
                            <ABuildingFL3 />
                        </ProCard>
                    )}
                    {activeContent === 'dc-building-fl-1' && (
                        <ProCard>
                            <DCBuildingL1 />
                        </ProCard>
                    )}
                    {activeContent === 'lantaix' && (
                        <ProCard>
                            <Lantaix />
                        </ProCard>
                    )} */}
                </Col>
            </Row>
        </PageContainer>
    );
});
