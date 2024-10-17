import { Handle, Position } from '@ant-design/pro-flow';
import { ProCard } from '@ant-design/pro-components';
import useStyles from '../../css/styles';

const Generator = (node: any) => {
  const { selected } = node;
  const { styles, cx } = useStyles();

  return (
    <ProCard bordered className={cx(selected && styles.selectedNode)}>
      <img src="/icons3/generator.png" alt="" height={100} />
      <Handle type={'source'} position={Position.Right} />
      <Handle type={'target'} position={Position.Left} />
    </ProCard>
  );
};

export default Generator;
