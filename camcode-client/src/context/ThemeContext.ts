import { createContext } from 'react';
import { ICustomStyle, ICustomThemeMetadata } from '@/types/customStyle.type';

export const CustomThemeContext = createContext<{
  customStyle: (ICustomThemeMetadata & ICustomStyle) | any;
  setCustomStyle: any;
}>({
  customStyle: {},
  setCustomStyle: () => {},
});
