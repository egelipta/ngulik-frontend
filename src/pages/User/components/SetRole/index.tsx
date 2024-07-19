import { allRolesOptionsApiV1AdminRoleAllGet } from '@/services/pjvms/roleManagement';
import { setRoleApiV1AdminUserSetRolePut } from '@/services/pjvms/userManagement';
import type { FormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormCheckbox } from '@ant-design/pro-form';
import { message } from 'antd';
import { memo, useRef, useState } from 'react';

interface IProps {
  visible: boolean;
  setvisible: (e: boolean) => void;
  UserData: API.UserListItem;
}

export default memo(({ visible, setvisible, UserData }: IProps) => {
  const formRef = useRef<FormInstance>();
  const [submit, setsubmit] = useState(true);

  // 权限分配
  const updateUserRole = async (values: API.SetRole) => {
    values.user_id = UserData.id;
    const result = await setRoleApiV1AdminUserSetRolePut(values);
    if (result.code === 200) {
      message.success(result.message);
      setvisible(false);
    } else {
      message.info(result.message);
    }
  };

  return (
    <>
      {UserData && (
        <ModalForm
          title={'Tetapkan Peran'}
          open={visible}
          formRef={formRef}
          width={400}
          submitter={{
            searchConfig: { submitText: 'Simpan' },
            submitButtonProps: { disabled: submit },
          }}
          onFinish={updateUserRole}
          modalProps={{
            destroyOnClose: true,
            mask: true,
            onCancel: () => setvisible(false),
          }}
        >
          <ProFormCheckbox.Group
            name={'roles'}
            layout={'vertical'}
            request={async () => {
              const result = await allRolesOptionsApiV1AdminRoleAllGet({ user_id: UserData.id });
              if (result.code === 200) {
                formRef.current?.setFieldsValue({ roles: result.data.user_roles });
                if (result.data.all_role.length) {
                  setsubmit(false);
                }
                return result.data.all_role;
              }
              return [];
            }}
          />
        </ModalForm>
      )}
    </>
  );
});
