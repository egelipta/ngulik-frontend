import { workfloweditorListApiV1WorkfloweditorWorkfloweditorGet, workfolweditorDelApiV1WorkfloweditorWorkfloweditorDelDataDelete } from '@/services/pjvms/workflowEditor';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumnType, ProTable } from '@ant-design/pro-components';
import { Empty, Button, Popconfirm, message } from 'antd';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkflowEditor = () => {
    const actionRef = useRef<ActionType>();
    const navigate = useNavigate();

    const deleteData = async (value: API.workfolweditorDelApiV1WorkfloweditorWorkfloweditorDelDataDeleteParams) => {
        const result = await workfolweditorDelApiV1WorkfloweditorWorkfloweditorDelDataDelete({ id: value.id });
        if (result.code === 200) {
            // refresh the list
            actionRef.current?.reload();
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    };

    const columns: ProColumnType<API.WorkflowEditorItem>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Tanggal',
            dataIndex: 'create_time',
            valueType: 'date'
        },
        {
            title: 'Actionable',
            valueType: 'option',
            width: 200,
            render: (_dom, d) => {
                return [
                    <Button
                        key={'review'}
                        type="dashed"
                        shape="round"
                        onClick={() => {
                            navigate(`/workflow-editor/editor/${d.id}`); // Menggunakan navigate untuk navigasi
                            console.log(d.id);
                        }}
                    >
                        <SearchOutlined />
                    </Button>,
                    <Popconfirm
                        key={'delete'}
                        title="Anda yakin?"
                        onConfirm={() => deleteData(d)}
                        placement="leftTop"
                    >
                        <Button danger type="primary" shape="default">
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>,
                ];
            },
        },
    ];

    return (
        <PageContainer>
            <ProTable
                bordered
                headerTitle=""
                actionRef={actionRef}
                columns={columns}
                defaultSize='small'
                cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
                pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                locale={{ emptyText: <Empty /> }}
                request={async (params) => workfloweditorListApiV1WorkfloweditorWorkfloweditorGet({ ...params })}
                toolBarRender={() => [
                    <Button
                        key="add_data"
                        type="primary"
                        onClick={() => {
                            navigate('/workflow-editor/add-data'); // Ganti '/target-page' dengan rute tujuan Anda
                        }}
                    >
                        <PlusOutlined />
                        Tambah
                    </Button>,
                ]}
            />
        </PageContainer>
    );
};

export default WorkflowEditor;
