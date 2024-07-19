import {
    tugasListApiV1TugasTugasGet,
} from '@/services/pjvms/tugas';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Empty, Popconfirm } from 'antd';
import { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default memo(() => {
    const actionRef = useRef<ActionType>();
    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [dataTugas, setDataTugas] = useState<API.TugasItem>();

    const columns: ProColumnType<API.TugasItem>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Start',
            dataIndex: 'start',
        },
        {
            title: 'End',
            dataIndex: 'end',
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
        },
        {
            title: 'Type',
            dataIndex: 'tipe',
        },
        {
            title: 'Project',
            dataIndex: 'project',
        },
        {
            title: 'Dependencies',
            dataIndex: 'dependencies',
        },
        {
            title: 'Hide',
            dataIndex: 'hidechildren',
            valueEnum: {
                false: { text: 'Induk' },
                true: { text: 'Anak' },
            },
        },
        {
            title: 'Actionable',
            valueType: 'option',
            width: 200,
            render: (_dom, d) => {
                return [
                    <Button
                        key={'edit'}
                        type="dashed"
                        shape="round"
                        onClick={() => {
                            setDataTugas(d);
                            setEditVisible(true);
                        }}
                    >
                        Ubah
                    </Button>,
                    <Popconfirm
                        key={'delete'}
                        title="Anda yakin?"
                        // onConfirm={() => deleteData(d)}
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
            {/* TABEL DATA */}
            <ProTable
                bordered
                headerTitle=""
                actionRef={actionRef}
                columns={columns}
                size="small"
                cardProps={{ bodyStyle: { paddingBottom: 20, paddingTop: 0 } }}
                pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                locale={{ emptyText: <Empty /> }}
                request={async (params) => tugasListApiV1TugasTugasGet({ ...params })}
                toolBarRender={() => [
                    <Button
                        key="add_data"
                        type="primary"
                        onClick={() => {
                            setAddVisible(true);
                        }}
                    >
                        <PlusOutlined />
                        Tambah
                    </Button>,
                ]}
            />

        </PageContainer>
    );
});
