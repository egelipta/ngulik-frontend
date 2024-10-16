import { Handle, Position } from '@ant-design/pro-flow';
import { CopyOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import useStyles from '../../css/styles';

const IkonDua = (node: any) => {
  const { selected } = node;
  const { styles, cx } = useStyles();

  return (
    <ProCard bordered className={cx(selected && styles.selectedNode)}>
      <CopyOutlined style={{ fontSize: 100 }} />
      <Handle type={'source'} position={Position.Right} />
      <Handle type={'target'} position={Position.Left} />
    </ProCard>
  );
};

export default IkonDua;
