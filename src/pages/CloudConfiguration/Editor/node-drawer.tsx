import { DrawerForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { ColorPicker, Slider, Space } from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';
import React from 'react';

interface NodeDrawerProps {
    selectedNode: any; // Change this type according to your node structure
    drawerVisible: boolean;
    setDrawerVisible: (visible: boolean) => void;
    handleSaveUpdateNode: () => void;
    nodeData: {
        title: string;
        idDevice: number | null;
        size: number;
        nodeType: string;
        colorGauge: string[];
        colorCircle: string[];
        colorLiquid: string;
    };
    setNodeData: (data: {
        title: string;
        idDevice: number | null;
        size: number;
        nodeType: string;
        colorGauge: string[];
        colorCircle: string[];
        colorLiquid: string;
    }) => void;
}

const NodeDrawer: React.FC<NodeDrawerProps> = ({
    selectedNode,
    drawerVisible,
    setDrawerVisible,
    handleSaveUpdateNode,
    nodeData,
    setNodeData,
}) => {
    const nodeType = selectedNode ? selectedNode.type : '';

    return (
        <DrawerForm
            onOpenChange={setDrawerVisible}
            open={drawerVisible}
            title={"Basic Setup"}
            resize={{
                maxWidth: window.innerWidth * 0.8,
                minWidth: 400,
            }}
            autoFocusFirstInput
            drawerProps={{
                destroyOnClose: true,
            }}
            onFinish={async () => {
                handleSaveUpdateNode();
                return true;
            }}
        >
            <ProFormText
                width={"md"}
                name="title"
                label="Nama"
                placeholder="Enter node title"
                initialValue={nodeData.title}
                fieldProps={{
                    onChange: (e) => setNodeData({ ...nodeData, title: e.target.value || '' }),
                }}
            />
            <ProFormSelect
                width={"md"}
                showSearch
                name={'idDevice'}
                label={'Perangkat'}
                placeholder={'Pilih yang terbaik!'}
                fieldProps={{
                    value: nodeData.idDevice,
                    onChange: (value: number | null) => setNodeData({ ...nodeData, idDevice: value as number | null }),
                }}
                options={[
                    { label: 'Device 1 - 20', value: 1 },
                    { label: 'Device 2 - 40', value: 2 },
                    { label: 'Device 3 - 60', value: 3 },
                    { label: 'Device 4 - 80', value: 4 },
                    { label: 'Device 5 - 100', value: 5 },
                ]}
            />
            <ProForm.Item
                label={'Ukuran'}
                name={'size'}
            >
                <Slider
                    min={150}
                    max={500}
                    defaultValue={nodeData.size}
                    onChange={(value) => setNodeData({ ...nodeData, size: value })}
                />
            </ProForm.Item>

            {/* GAUGE */}
            {nodeType === 'ChartGauge' && (
                <ProForm.Group>
                    <ProForm.Item
                        name={'colorGauge'}
                        label={'Warna'}
                    >
                        <Space>
                            {nodeData.colorGauge.map((colorGauge, index) => (
                                <ColorPicker
                                    key={index}
                                    defaultValue={colorGauge}
                                    onChange={(_value: AggregationColor, css: string) => {
                                        const newColors = [...nodeData.colorGauge];
                                        newColors[index] = css;
                                        setNodeData({ ...nodeData, colorGauge: newColors });
                                    }}
                                />
                            ))}
                        </Space>
                    </ProForm.Item>

                    {/* <ProFormDigit
                        label="Jarak 0 - ..."
                        name="range"
                        initialValue={nodeData.range}
                        width="md"
                        min={50}
                        max={1000}
                        fieldProps={{
                            onChange: (value: number | null) => {
                                setNodeData({ ...nodeData, range: value ?? 50 });
                            },
                        }}
                    /> */}

                </ProForm.Group>
            )}
            {/* PROGRESS */}
            {nodeType === 'ProgressCircle' && (
                <ProForm.Item
                    name={'colorCircle'}
                    label={'Warna'}
                >
                    <Space>
                        {nodeData.colorCircle.map((colorCircle, index) => (
                            <ColorPicker
                                key={index}
                                value={colorCircle}
                                onChange={(_value: AggregationColor, css: string) => {
                                    const newColors = [...nodeData.colorCircle];
                                    newColors[index] = css;
                                    setNodeData({ ...nodeData, colorCircle: newColors });
                                }}
                            />
                        ))}
                    </Space>
                </ProForm.Item>
            )}
            {/* LIQUID */}
            {nodeType === 'ChartLiquid' && (
                <ProForm.Item
                    name={'colorLiquid'}
                    label={'Warna'}
                >
                    <ColorPicker
                        defaultValue={nodeData.colorLiquid}
                        onChange={(_value: AggregationColor, css: string) => {
                            setNodeData({ ...nodeData, colorLiquid: css });
                        }}
                    />
                </ProForm.Item>
            )}

        </DrawerForm>
    );
};

export default NodeDrawer;
