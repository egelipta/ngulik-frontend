import React, { memo, useEffect, useState } from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Empty, Input, Space, Switch } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';
import { ViewMode, Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { ganttTaskApiV1TugasTugasGanttTaskGet } from '@/services/pjvms/tugas'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default memo(() => {
    const intl = useIntl();

    let locale = localStorage.getItem('umi_locale');
    if (locale !== 'id-ID' && locale !== 'en-US') {
        locale = 'id-ID';
        localStorage.setItem('umi_locale', locale);
    }

    const [dataTask, setDataTask] = useState<Task[]>([]);
    const [view, setView] = useState(ViewMode.Month);
    const [isChecked, setIsChecked] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await ganttTaskApiV1TugasTugasGanttTaskGet();
            const formattedTasks = response.map((item: { start: string | number | Date; end: string | number | Date; }) => ({
                ...item,
                start: new Date(item.start),
                end: new Date(item.end),
                // hideChildren: true,
            }));
            setDataTask(formattedTasks);
        } catch (error) {
            console.error('Error fetching dataTask:', error);
        }
    };

    const handleExpanderClick = (task: Task) => {
        setDataTask(dataTask.map((t) => (t.id === task.id ? task : t)));
        console.log("EXPANDED:" + task.id);
    };

    let columnWidth = 60;
    if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    return (
        <PageContainer>
            <ProCard
                title={[
                    <Space>
                        <Button onClick={() => setView(ViewMode.Day)}><FormattedMessage id='pages.label.day' /></Button>
                        <Button onClick={() => setView(ViewMode.Week)}><FormattedMessage id='pages.label.week' /></Button>
                        <Button onClick={() => setView(ViewMode.Month)}><FormattedMessage id='pages.label.month' /></Button>
                        <Switch
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                        <label htmlFor="">
                            <FormattedMessage id='pages.label.show-list' />
                        </label>
                    </Space>
                ]}
            >
                {dataTask.length > 0 ? (
                    <Gantt
                        todayColor="rgba(66, 66, 63 ,0.2)"
                        fontSize="14px"
                        rowHeight={40}
                        tasks={dataTask}
                        viewMode={view}
                        locale={locale}
                        onExpanderClick={handleExpanderClick}
                        listCellWidth={isChecked ? "155px" : ""}
                        columnWidth={columnWidth}
                    />
                ) : (
                    <Empty />
                )}
            </ProCard>
        </PageContainer>
    );
});
