import { CustomThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';

const useCustomTheme = () => {
  const { customStyle, setCustomStyle } = useContext(CustomThemeContext);
  return { customStyle, setCustomStyle };
};
export default useCustomTheme;
