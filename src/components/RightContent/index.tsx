// import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    // icon={'🌐'}

    // text={}
    />
  );
};

// export const Question = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         height: 26,
//       }}
//       onClick={() => {
//         window.open('');
//       }}
//     >
//       {/* <QuestionCircleOutlined /> */}
//     </div>
//   );
// };
