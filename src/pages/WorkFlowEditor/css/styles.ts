import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    container: {
      width: '100%',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
    },
    aside: {
      width: '350px',
      height: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 10000000,
      borderRight: '1px solid #eee',
      padding: '15px 10px',
      fontSize: '12px',
      background: '#fcfcfc',
      marginBottom: '10px',
      overflowY: 'auto',

      // WebKit Browsers (Chrome, Safari)
      '&::-webkit-scrollbar': {
        width: '8px', // Lebar scrollbar
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Warna thumb scrollbar dengan transparansi
        borderRadius: '10px', // Membuat thumb lebih bulat
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Sedikit lebih gelap saat hover
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent', // Track transparan
      },

      // Firefox
      scrollbarWidth: 'thin', // Scrollbar lebih tipis
      scrollbarColor: 'rgba(0, 0, 0, 0.1) transparent', // Warna thumb dan track
    },
    selectedNode: {
      border: '1px solid #007bff',
    },
  };
});
export default useStyles;
