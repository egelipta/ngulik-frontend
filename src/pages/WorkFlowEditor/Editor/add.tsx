import { useEffect, useState } from 'react';
import { Background, BackgroundVariant, FlowEditor, FlowEditorProvider, FlowPanel, useFlowEditor } from '@ant-design/pro-flow';
import { DrawerForm, PageContainer, ProCard, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { DeleteOutlined } from '@ant-design/icons';
import useStyles from '../css/styles';
import { useCallback } from 'react';
import { Button, Drawer, Input, message, Slider, Space } from 'antd';
import { workfloweditorAddApiV1WorkfloweditorWorkfloweditorAddDataPost } from '@/services/pjvms/workflowEditor';

import Sidebar from './sidebar';

import ChartGauge from '../Components/Charts/gauge';
import ProgressCircle from '../Components/Charts/progress-circle';
import ChartLiquid from '../Components/Charts/liquid';

import { useNavigate } from 'react-router-dom';

let id = 0;
const getId = () => `${id++}`;
// const getId = () => `${Math.floor(new Date().getTime() / 1000)}`;

const nodeTypes = {
    ChartGauge: ChartGauge,
    ProgressCircle: ProgressCircle,
    ChartLiquid: ChartLiquid,
};

const ProFlowDemo = () => {
    const editor = useFlowEditor();
    const { styles } = useStyles();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [idPerangkat, setIdPerangkat] = useState<number | null>(null);
    const [title, setTitle] = useState<string>('');
    const [size, setSize] = useState(150);

    // fungsi drag/ambil component di sidebar
    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // fungsi untuk drop component dari sidebar ke drop zone
    // component di sidebar didrag dan drop ke dropzone
    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();
            if (!editor) return;

            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = editor.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: {
                    title: `${type}`,
                    idPerangkat: null,
                    size: 150,
                },
            };

            editor.addNode(newNode);
        },
        [editor, idPerangkat, size],
    );

    const createData = async (values: API.CreateWorkflowEditor) => {
        try {
            const result = await workfloweditorAddApiV1WorkfloweditorWorkfloweditorAddDataPost(values);
            return result;
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    };

    // fungsi simpan data node dan edge pada drop zone
    const saveData = useCallback(async () => {
        if (!editor) return;

        const workflowName = name.trim() === '' ? `Untitled - ${Math.floor(new Date().getTime() / 1000)}` : name;

        const nodes = editor.reactflow?.getNodes() || [];
        // if (!nodes || nodes.length === 0) {
        //     message.warning('Tidak ada node yang ditemukan untuk disimpan.');
        //     return;
        // }

        const edges = editor.reactflow?.getEdges() || [];
        // if (!edges || edges.length === 0) {
        //     message.warning('Tidak ada edge yang ditemukan untuk disimpan.');
        //     return;
        // }

        // struktur data sesuai backend yang akan disimpan
        const strukturData = {
            name: workflowName,
            nodesjson: nodes.map((node) => ({
                id: node.id,
                type: node.type,
                position: node.position,
                data: node.data,
            })),
            edgesjson: edges.map((edge) => ({
                id: edge.id,
                type: edge.type,
                animated: edge.animated,
                style: edge.style,
                source: edge.source,
                target: edge.target,
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle,
                selected: edge.selected,
            })),
        };

        console.log('Saved Data:', strukturData);

        try {
            const result = await createData(strukturData);
            if (result && result.code === 200) {
                message.success(result.message);
                navigate('/workflow-editor')
            } else {
                message.error(result?.message || 'Failed');
            }
        } catch (error) {
            message.error('Error, try again later!');
        }
    }, [editor, name, createData]);

    //fungsi hapus Node dan Edge
    const hapusNodeEdge = () => {
        if (!editor || !editor.reactflow) return;

        editor.getSelectedKeys().forEach((id) => {
            //ketika hapus node, edge yang terkoneksi ikut terhapus
            const connectedEdges = editor.reactflow?.getEdges().filter(edge => edge.source === id || edge.target === id) || [];
            connectedEdges.forEach((edge) => {
                editor.deleteEdge(edge.id);
            });
            // hapus node dan edge satu persatu
            editor.deleteNode(id);
            editor.deleteEdge(id);
        });
    }

    // fungsi klik node
    const handleNodeClick = useCallback((_event: React.MouseEvent, node: any) => {
        setSelectedNode(node);
        setDrawerVisible(true);
        setTitle(node.data.title);
        setIdPerangkat(node.data.idPerangkat);
        setSize(node.data.size || 150);
    }, []);

    // fungsi update data pada drawer
    // jika tidak diisi maka default idPerangkat(null) dan title(nodeTypes)
    const handleSaveUpdateNode = async () => {
        if (selectedNode && editor) {
            // update node data sama idPerangkat dan title
            editor.updateNodeData(selectedNode.id, {
                ...selectedNode.data,
                idPerangkat,
                title,
                size,
            });
            setDrawerVisible(false);
            setIdPerangkat(null);
            setTitle('');
            message.success('Okay');
        }
    };

    return (
        <div className={styles.container}>
            <FlowEditor
                defaultViewport={{
                    x: 0,
                    y: 0,
                    zoom: 0.7,
                }}
                nodeTypes={nodeTypes}
                flowProps={{
                    onDrop,
                    onDragOver,
                    onNodeClick: handleNodeClick,
                    defaultEdgeOptions: {
                        type: 'smoothstep',
                        animated: true,
                        style: { strokeWidth: 8 },
                    },
                }}
                miniMap={false}
                devtools={true}
                background={true}
            >
                <Sidebar />
                <FlowPanel position="top-left">
                    <ProCard size='small'>
                        <Space direction="vertical">
                            <Input
                                name="name"
                                placeholder="Name..."
                                value={name}
                                onChange={(e) => setName(e.target.value || '')}
                                autoComplete='off'
                            />
                            <Space>
                                <Button
                                    danger
                                    type="primary"
                                    size="small"
                                    onClick={hapusNodeEdge}
                                >
                                    Hapus <DeleteOutlined />
                                </Button>
                                <Button
                                    type="primary"
                                    size="small"
                                    onClick={saveData}
                                >
                                    Simpan
                                </Button>
                            </Space>
                        </Space>
                    </ProCard>
                </FlowPanel>
            </FlowEditor>

            <DrawerForm
                onOpenChange={setDrawerVisible}
                open={drawerVisible}
                title="Basic Setup"
                resize={{
                    maxWidth: window.innerWidth * 0.8,
                    minWidth: 400,
                }}
                autoFocusFirstInput
                drawerProps={{
                    destroyOnClose: true,
                }}
                submitTimeout={2000}
                onFinish={async () => {
                    handleSaveUpdateNode();
                    // console.log(values.name);
                    // message.success('Berhasil disimpan');
                    return true;
                }}
            >
                {selectedNode && (
                    <ProForm.Group>
                        {/* <h3>{selectedNode.data.title}</h3>
                        <h3>{selectedNode.id}</h3> */}
                        <ProFormText
                            name='title'
                            label='Title'
                            placeholder='Enter node title'
                            fieldProps={{
                                value: title,
                                onChange: (e) => setTitle(e.target.value), // mengambil input title
                            }}
                        />

                        <ProFormSelect
                            width={"md"}
                            showSearch
                            name={'idPerangkat'}
                            label={'Perangkat'}
                            placeholder={'Pilih yang terbaik!'}
                            fieldProps={{
                                value: idPerangkat,
                                onChange: (value) => setIdPerangkat(value as number | null),
                            }}
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Status harus diisi!',
                            //     },
                            // ]}
                            options={[
                                { label: 'Device 1', value: 1 },
                                { label: 'Device Dua', value: 2 },
                                { label: 'Device 3', value: 3 },
                                { label: 'Device Empat', value: 4 },
                                { label: 'Device Full', value: 5 },
                            ]}
                        />

                        <ProForm.Item
                            label="Size"
                            name="size"
                        >
                            <Slider
                                min={150}
                                max={500}
                                value={size}
                                onChange={(value) => setSize(value || 150)}
                                style={{ width: 320 }}
                            />
                        </ProForm.Item>
                    </ProForm.Group>
                )}
            </DrawerForm>
        </div>
    );
};

const AddData = () => {
    return (
        <PageContainer>
            <FlowEditorProvider>
                <ProFlowDemo />
            </FlowEditorProvider>
        </PageContainer>
    );
};

export default AddData;
