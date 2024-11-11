//adddata
import { useState } from 'react';
import { FlowEditor, FlowEditorProvider, FlowPanel, useFlowEditor } from '@ant-design/pro-flow';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { DeleteOutlined } from '@ant-design/icons';
import useStyles from '../css/styles';
import { useCallback } from 'react';
import { Button, Input, message, Space } from 'antd';
import { workfloweditorAddApiV1WorkfloweditorWorkfloweditorAddDataPost } from '@/services/pjvms/workflowEditor';

import Sidebar from './sidebar';
import NodeDrawer from './node-drawer';

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

const AddDataFlowEditor = () => {
    const editor = useFlowEditor();
    const { styles } = useStyles();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const [nodeData, setNodeData] = useState<{
        title: string;
        idDevice: number | null;
        size: number;
        nodeType: string;
        color: string | string[];
        min: number;
        max: number;
        batasBawah: number;
        batasAtas: number;
    }>({
        title: '',
        idDevice: null,
        size: 0,
        nodeType: '',
        color: '',
        min: 0,
        max: 0,
        batasBawah: 0,
        batasAtas: 0,
    });

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
                    idDevice: null,
                    size: 150,
                    color: type === 'ChartGauge'
                        ? ['rgb(82, 196, 26)', 'rgb(250, 173, 20)', 'rgb(245, 34, 45)']
                        : type === 'ProgressCircle'
                            ? ['rgb(232, 239, 245)', 'rgb(102, 175, 244)']
                            : 'rgb(22, 135, 241)',
                    ...(type === 'ChartGauge' && {
                        min: 0,
                        max: 100,
                        batasBawah: 40,
                        batasAtas: 70,
                    }),

                },
            };
            console.log(newNode)

            editor.addNode(newNode);
        },
        [editor],
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
                navigate('/cloud-configuration')
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
        setNodeData(node.data); // Set node data directly
        setDrawerVisible(true);
    }, []);

    // fungsi update data pada drawer
    // jika tidak diisi maka default idPerangkat(null) dan title(nodeTypes)
    const handleSaveUpdateNode = async () => {
        if (selectedNode && editor) {
            editor.updateNodeData(selectedNode.id, nodeData);
            setDrawerVisible(false);
            message.success('Data berhasil disimpan');
            console.log('NODE DATA: ', nodeData)
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

            {nodeData && (
                <NodeDrawer
                    selectedNode={selectedNode}
                    drawerVisible={drawerVisible}
                    setDrawerVisible={setDrawerVisible}
                    handleSaveUpdateNode={handleSaveUpdateNode}
                    nodeData={nodeData}
                    setNodeData={setNodeData}
                />
            )}

        </div>
    );
};

const CanvasFlowEditor = () => {
    return (
        <PageContainer>
            <FlowEditorProvider>
                <AddDataFlowEditor />
            </FlowEditorProvider>
        </PageContainer>
    );
};

export default CanvasFlowEditor;
