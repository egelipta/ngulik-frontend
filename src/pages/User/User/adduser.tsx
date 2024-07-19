import { userAdd } from '@/services/user/api';
import {
    ModalForm,
    ProFormSwitch,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
} from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { memo } from 'react';

interface IProps {
    actionRef: ActionType | undefined;
    visible: boolean;
    setvisible: (e: boolean) => void;
}

export default memo(({ actionRef, visible, setvisible }: IProps) => {
    // Create users
    const createUser = async (values: USER.CreateUser) => {
        if (values.user_phone === '') {
            values.user_phone = '';
        }
        const result = await userAdd(values);
        if (result.code === 200) {
            // close the window
            setvisible(false);
            // refresh the list
            actionRef?.reload();
            message.success(result.message);
        } else {
            message.info(result.message);
        }
    };

    return (
        <ModalForm
            title={'Tambah Manajemen Pengguna'}
            open={visible}
            width={500}
            submitter={{ searchConfig: { resetText: 'Batal', submitText: 'Simpan' } }}
            onFinish={createUser}
            modalProps={{
                destroyOnClose: true,
                mask: true,
                onCancel: () => setvisible(false),
            }}
        >
            <ProFormUploadButton
                name="photo_box"
                title="Upload"
                extra="Foto pengguna"
                max={1}
            // showUploadList={false}
            // {...upload_props}
            // fieldProps={{
            //   headers: { Authorization: `Bearer ${localStorage.getItem('Authorization') || ''}` },
            // }}
            />
            <ProFormText
                name={'nickname'}
                label={'Nama Pengguna'}
                placeholder={'Nama pengguna'}
                rules={[
                    {
                        required: true,
                        message: 'Masukkan nama pengguna!',
                    },
                    {
                        min: 3,
                        message: 'Nama minimal 3 karakter!',
                    },
                    {
                        max: 255,
                        message: 'Nama maksimal 255 karakter!',
                    },
                ]}
            />
            <ProFormText
                name={'username'}
                label={'Username'}
                placeholder={'username'}
                rules={[
                    {
                        required: true,
                        message: 'Masukkan nama pengguna!',
                    },
                    {
                        min: 3,
                        message: 'Nama minimal 3 karakter!',
                    },
                    {
                        max: 255,
                        message: 'Nama maksimal 255 karakter!',
                    },
                ]}
            />
            <ProFormText.Password
                name={'password'}
                label={'Password'}
                placeholder={'Password'}
                rules={[
                    {
                        required: true,
                        message: 'Masukkan password!',
                    },
                    {
                        min: 6,
                        message: 'Password minimal 6 karakter!',
                    },
                ]}
            />
            <ProFormText
                name="user_phone"
                placeholder="Nomor handphone"
                label={'Nomor Handphone'}
                rules={[{ pattern: /^08[3456789][0-9]{9}$/, message: 'Masukkan nomor handphone!' }]}
            />

            <ProFormText
                hidden
                name="user_type"
                placeholder="User Type"
                label={'User Type'}
                initialValue={1}
            />

            <ProFormSwitch
                label={'Status Pengguna'}
                tooltip={'Default: disabled'}
                name={'user_status'}
                initialValue={false}
            />

            <ProFormTextArea
                label="Catatan"
                name="remarks"
                fieldProps={{ maxLength: 30, showCount: true }}
                rules={[{ max: 30, message: 'Catatan maksimal 30 karakter!' }]}
                placeholder={'Masukkan catatan...'}
            />
        </ModalForm>
    );
});
