import { ModalForm, ProCard } from '@ant-design/pro-components';
import { Affix, Input, Row, Col, Divider, Typography } from 'antd';
import React, { memo, useState } from 'react';
import exportComponent from '../Components/exportComponents';
import AddComponent from './add-component';

interface IProps {
    visible: boolean;
    onClose: () => void;
    reload: () => void;
}

const SelectComponent = memo(({ visible, onClose, reload }: IProps) => {
    const { Text } = Typography;
    const [addVisible, setAddVisible] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState<{ typeComponent: string; component: React.ElementType } | null>(null);
    const [cari, setCari] = useState('');

    const openModalAdd = (typeComponent: string, Component: React.ElementType) => {
        setSelectedComponent({ typeComponent, component: Component });
        setAddVisible(true);
        onClose();
    };

    // Fungsi untuk memfilter komponen
    const filteredComponents = Object.entries(exportComponent.theComponent).filter(([key]) =>
        key.toLowerCase().includes(cari.toLowerCase())
    );

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
                                onSearch={(value) => setCari(value)}
                                onChange={(e) => setCari(e.target.value)}
                                value={cari}
                            />
                        </Affix>
                    </Col>
                </Row>
                <Divider />
                <div style={{ height: '520px', overflowY: 'auto', padding: '10px' }}>
                    <Row gutter={[16, 16]}>
                        {filteredComponents.map(([key, Component]) => (
                            <Col key={key} xxl={8} xl={8} md={12} sm={12} xs={24}>
                                <ProCard
                                    title={[<Text strong>{key}</Text>]}
                                    bordered
                                    hoverable
                                    headerBordered
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
