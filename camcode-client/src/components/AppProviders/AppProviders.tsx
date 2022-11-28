import { MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import { CustomThemeContext } from '@/context/ThemeContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import VarCodeLogo from '@/assets/varcode-logo.png';
import { NotificationsProvider } from '@mantine/notifications';
type Props = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();
const AppProviders = ({ children }: Props) => {
  const [customStyle, setCustomStyle] = useState({
    notchBG: '#1a3b4e',
    headerIcon: VarCodeLogo,
    footerIcon: VarCodeLogo,
    editInProgress: false,
    contentBG: '#ffffff',
    fontColor: '#000000',
    email: 'varcode@varcode.com',
    phone: '1-800-VARCODE',
    websiteLink: 'https://www.varcode.com',
    iScanID: '',
    barcode: '',
    scanBarcodeInfoText:
      '<h3><strong>Welcome!</strong></h3><h4><strong>you have just unpacked your box containing you meal-kits!</strong></h4><h4>scan the enclosed tag to provide us feedback and information, to ensure your satisfaction with our service</h4><p><br></p>',
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider>
        <MantineProvider
          theme={{ fontFamily: 'Montserrat', headings: { fontFamily: 'Montserrat' } }}
        >
          <CustomThemeContext.Provider value={{ customStyle, setCustomStyle }}>
            {children}
          </CustomThemeContext.Provider>
        </MantineProvider>
      </NotificationsProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
