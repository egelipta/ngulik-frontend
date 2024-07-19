import { memo, useEffect, useState } from 'react';
import { ModalForm, PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Input, Popconfirm, Space, message } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';
import {
    getDataUserApiV1AdminUserDataUserGet,
} from '@/services/pjvms/userManagement';


export default memo(() => {
    const intl = useIntl();

    const [searchText, setSearchText] = useState('');
    const [modalVisit, setModalVisit] = useState(false);

    useEffect(() => {
        getDataUser();
    }, []);

    const [dataUser, setDataUser] = useState([]);
    const getDataUser = async () => {
        try {
            const response = await getDataUserApiV1AdminUserDataUserGet();
            setDataUser(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Status',
            dataIndex: 'user_status',
            valueEnum: {
                false: { text: 'Disabled', status: 'Error' },
                true: { text: 'Enabled', status: 'Success' },
            },
        },
        {
            title: <FormattedMessage id="pages.action.optionTitle" />,
            width: 180,
            key: 'option',
            valueType: 'option',
            render: (_text: any, d: any) => [
                <Button type="dashed" size='small' onClick={() => console.log(d.name)}>
                    <FormattedMessage id="pages.action.update" />
                </Button>,
                <Popconfirm
                    title={intl.formatMessage({ id: 'pages.popConfirm.title' })}
                    description={intl.formatMessage({ id: 'pages.popConfirm.description' })}
                    // onConfirm={confirm}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger size='small'><FormattedMessage id="pages.action.delete" /></Button>
                </Popconfirm>,
            ],
        },
    ];

    const filteredData = dataUser.filter((item: any) =>
        (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.username && item.username.toString().includes(searchText)) ||
        (typeof item.user_status === 'string' && item.user_status.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
        <PageContainer>
            <ProTable
                defaultSize='small'
                headerTitle={[<b><i><FormattedMessage id="pages.table.title" /></i></b>]}
                search={false}
                columns={columns}
                dataSource={filteredData}
                toolBarRender={() => [
                    <Space>
                        <Input.Search
                            placeholder={intl.formatMessage({ id: 'pages.search.placeholder' })}
                            allowClear
                            enterButton
                            // value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={() => {
                                setModalVisit(true);
                            }}
                        >
                            + <FormattedMessage id="pages.button.add" />
                        </Button>
                    </Space>
                ]}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '25', '50', '100'],
                }}
            />

            <ModalForm
                title={intl.formatMessage({ id: 'pages.button.add' })}
                open={modalVisit}
                onFinish={async () => {
                    message.success('Berhasil...');
                    return true;
                }}
                onOpenChange={setModalVisit}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dolorem voluptate aliquid id eum cum. Esse temporibus voluptate voluptatibus doloremque, aperiam, fuga earum repellendus nihil ad, quod minima dolorum impedit.
            </ModalForm>
        </PageContainer>
    );
});
