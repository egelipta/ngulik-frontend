import { useEffect, useState } from 'react';
import { Background, BackgroundVariant, FlowEditor, FlowEditorProvider, FlowPanel, useFlowEditor } from '@ant-design/pro-flow';

import { PageContainer } from '@ant-design/pro-components';
import { DeleteOutlined } from '@ant-design/icons';
import useStyles from './css/styles';
import { useCallback } from 'react';
import { Button, Space } from 'antd';
import Sidebar from './sidebar';

import IkonSatu from './Components/Satu/ikonSatu';
import IkonDua from './Components/Satu/ikonDua';
import Server from './Components/Dua/server';
import RackServer from './Components/Dua/rackServer';
import Cloud from './Components/Dua/cloud';
import Pc from './Components/Dua/pc';
import Tree from './Components/Tiga/tree';
import Car from './Components/Tiga/car';
import Electricity from './Components/Tiga/electricity';
import Generator from './Components/Tiga/generator';
import Building from './Components/Tiga/building';
import Circle1 from './Components/Empat/circle1';
import Circle2 from './Components/Empat/circle2';
import Circle3 from './Components/Empat/circle3';
import { workfloweditorApiV1WorkfloweditorWorkfloweditorGetDataGet } from '@/services/pjvms/workflowEditor';

// let id = 0;
const getId = () => `${Math.floor(new Date().getTime() / 1000)}`;

const nodeTypes = {
    IkonSatu: IkonSatu,
    IkonDua: IkonDua,
    Server: Server,
    RackServer: RackServer,
    Cloud: Cloud,
    Pc: Pc,
    Tree: Tree,
    Car: Car,
    Electricity: Electricity,
    Generator: Generator,
    Building: Building,
    Circle1: Circle1,
    Circle2: Circle2,
    Circle3: Circle3,
};

const ProFlowDemo = () => {
    const editor = useFlowEditor();
    const { styles } = useStyles();

    const [dataNodes, setDataNodes] = useState<any[]>([]);
    const [dataEdges, setDataEdges] = useState<any[]>([]);

    const getDataWorkflow = async () => {
        try {
            const result = await workfloweditorApiV1WorkfloweditorWorkfloweditorGetDataGet();
            // Assuming the result is an array, extract the nodesjson arrays
            const nodesData = result.map((item: any) => item.nodesjson).flat();
            setDataNodes(nodesData);

            const edgesData = result.map((item: any) => item.edgesjson).flat();
            setDataEdges(edgesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getDataWorkflow();
    }, []);

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    //fungsi drop node ke drop zone
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
                    title: `${type} node`,
                },
            };

            editor.addNode(newNode);
        },
        [editor],
    );

    // MEnampilkan data node dan edge*****
    useEffect(() => {
        if (!editor) return;
        const nodes = dataNodes;
        const edges = dataEdges;

        nodes.forEach(node => {
            editor.addNode(node);
        });

        edges.forEach(edge => {
            editor.addEdge(edge);
        });
    }, [editor]);

    return (
        <div className={styles.container}>
            <FlowEditor
                defaultViewport={
                    {
                        x: 0,
                        y: 0,
                        zoom: 0.7
                    }
                }
                nodeTypes={nodeTypes}
                flowProps={{
                    onDrop,
                    onDragOver,
                    defaultEdgeOptions: {
                        type: 'smoothstep',
                        animated: true,
                        style: { strokeWidth: 3 },
                        // type: 'custom',
                    },
                }}
                miniMap={false}
                devtools={true}
                background={true}
            >
                <Sidebar />
                <FlowPanel position="top-left">
                    <Space>
                        <Button
                            danger
                            type="primary"
                            size="small"
                            onClick={() => {
                                editor.getSelectedKeys().forEach((id) => {
                                    editor.deleteNode(id);
                                });
                            }}
                        >
                            Node <DeleteOutlined />
                        </Button>
                        <Button
                            danger
                            type="primary"
                            size="small"
                            onClick={() => {
                                editor.getSelectedKeys().forEach((id) => {
                                    editor.deleteEdge(id);
                                });
                            }}
                        >
                            Edge <DeleteOutlined />
                        </Button>
                        {/* <Button
                            type="primary"
                            size="small"
                            onClick={logFlowData}
                        >
                            Simpan
                        </Button> */}
                    </Space>
                </FlowPanel>
                {/* <Background gap={30} offset={2} color='grey' variant={BackgroundVariant.Cross} /> */}
            </FlowEditor>
        </div>
    );
};

const WorkflowEditor = () => {
    return (
        <PageContainer>
            <FlowEditorProvider>
                <ProFlowDemo />
            </FlowEditorProvider>
        </PageContainer>
    );
};

export default WorkflowEditor;
