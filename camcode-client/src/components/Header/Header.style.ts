import { createStyles } from '@mantine/core';

export const headerStyle = (headerBg: string) =>
  createStyles((theme) => ({
    root: {
      padding: 0,
      minHeight: '200px',
      background: headerBg,
      display: 'flex',
      justifyContent: 'center',
      margin: 0,
    },
  }));
