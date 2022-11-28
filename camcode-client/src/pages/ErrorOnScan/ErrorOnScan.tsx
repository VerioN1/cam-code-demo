import React from 'react';
import Layout from '@/layout/Layout';
import { Center, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Button from '@/lib/Button/Button';

const ErrorOnScan = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Center sx={{ flexDirection: 'column', textAlign: 'center', height: '100%' }}>
        <Title mb="5rem">Oh, An Error Occured</Title>
        <Button onClick={() => navigate('/ScanCode')}>Try Again</Button>
      </Center>
    </Layout>
  );
};

export default ErrorOnScan;
