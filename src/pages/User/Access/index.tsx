import { allAccess, roleUpdateAccess } from '@/services/role/api';
import { CheckCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Link, history } from '@umijs/max';
import { Button, Card, Tree, message } from 'antd';
import { memo, useEffect, useState } from 'react';
// import { Link, history } from 'umi';

export default memo(() => {
  const [RoleData] = useState<API.RoleItem | any>(history.location.state);
  const [AccessData, setAccessData] = useState<Access.AccessItem[]>();
  const [RoleAccess, setRoleAccess] = useState<string[]>();
  const [checkedKeysData, setCheckedKeysData] = useState<number | string[]>([]);

  // Get role permissions, ownership permissions
  const get_access = async () => {
    const result = await allAccess({ role_id: RoleData.id });
    if (result.code === 200) {
      setAccessData(result.data.all_access);
      setRoleAccess(result.data.role_access);
      return;
    }
    message.info(result.message);
  };

  const set_access = async () => {
    const result = await roleUpdateAccess({ role_id: RoleData.id, access: checkedKeysData });
    if (result.code === 200) {
      message.success(result.message);
      return;
    }
    message.info(result.message);
  };

  useEffect(() => {
    if (RoleData) {
      get_access();
      return;
    }
    history.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RoleData]);

  return (
    <PageContainer
      title={`${RoleData?.role_name} Permission settings`}
      footer={[
        <Button key={'back'}>
          <Link to={'/admin/role'}>Batal</Link>
        </Button>,
        <Button type={'primary'} icon={<CheckCircleOutlined />} onClick={set_access} key={'save'}>
          Simpan
        </Button>,
      ]}
    >
      <Card>
        {AccessData && RoleAccess && (
          <Tree
            checkable
            defaultExpandAll
            defaultCheckedKeys={RoleAccess}
            selectable={false}
            onCheck={(_, info) => {
              setCheckedKeysData(
                info.checkedNodes.map((v) => v.key).filter((v) => typeof v === 'number'),
              );
            }}
            treeData={AccessData}
          />
        )}
      </Card>
    </PageContainer>
  );
});
