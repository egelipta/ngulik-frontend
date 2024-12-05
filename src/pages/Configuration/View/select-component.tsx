import React, { memo, useState } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import { Row, Col, Affix, Divider, Input, Typography } from 'antd';
import ProCard from '@ant-design/pro-card';

import AddComponent from './add-component';
import TheComponent from '../Components/theComponent';

interface IProps {
    visible: boolean;
    onClose: () => void;
    reload: () => void;
}

const SelectComponent = memo(({ visible, onClose, reload }: IProps) => {
    const { Text } = Typography;
    const [search, setSearch] = useState<string>('');
    const [addVisible, setAddVisible] = useState(false);

    const [selectedComponent, setSelectedComponent] = useState<{ typeComponent: string; component: React.ElementType } | null>(null);

    const searchComponents = Object.entries(TheComponent).filter(([key]) =>
        key.toLowerCase().includes(search.toLowerCase())
    );

    const openModalAdd = (typeComponent: string, Component: React.ElementType) => {
        setSelectedComponent({ typeComponent, component: Component });
        setAddVisible(true);
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
                        {searchComponents.map(([key, Component]) => (
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
                                    onClick={() => openModalAdd(key, Component)}
                                >
                                    <Component />
                                </ProCard>
                            </Col>
                        ))}
                    </Row>
                </div>
            </ModalForm>

            <AddComponent
                visible={addVisible}
                onClose={() => setAddVisible(false)}
                SelectedComponent={selectedComponent}
                reload={reload}
            />
        </>
    );
});

export default SelectComponent;
