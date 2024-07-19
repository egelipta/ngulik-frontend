import { ActionType, ModalForm, ProFormDatePicker, ProFormDateTimePicker, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { Space, Typography, message } from 'antd';
import { memo, useState } from 'react';
import {
    tugasAddApiV1TugasTugasPost
} from '@/services/pjvms/tugas'
import moment from 'moment';

const { Paragraph } = Typography;

interface IProps {
    visible: boolean;
    setVisible: (e: boolean) => void;
    actionRef: React.MutableRefObject<ActionType | undefined>;
}

export default memo(({ actionRef, visible, setVisible }: IProps) => {

    const createData = async (values: API.CreateTugas) => {
        values.tipe = 'project';
        values.project = '0';
        values.progress = 0;
        values.dependencies = '0';
        const result = await tugasAddApiV1TugasTugasPost(values);
        if (result.code === 200) {
            setVisible(false);
            actionRef.current?.reload();
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    };

    return (
        <ModalForm
            title="Add Data"
            open={visible}
            width={500}
            labelAlign="right"
            layout="vertical"
            submitter={{ searchConfig: { submitText: 'Simpan', resetText: 'Batal' } }}
            onFinish={createData}
            modalProps={{
                destroyOnClose: true,
                mask: true,
                okButtonProps: { disabled: true, 'aria-disabled': true },
                cancelButtonProps: { 'aria-disabled': true },
                onCancel: () => setVisible(false),
            }}
        >
            <ProFormText
                name="name"
                label="Proyek"
                placeholder="Masukkan nama proyek"
                width="lg"
            />
            <ProFormGroup>
                <ProFormDateTimePicker
                    name="start"
                    label="Mulai"
                    width="lg"
                />
                <ProFormDateTimePicker
                    name="end"
                    label="Selesai"
                    width="lg"
                />
            </ProFormGroup>
        </ModalForm>
    );
});
