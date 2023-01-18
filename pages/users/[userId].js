import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../../utils/context/authContext';

export default function UserView() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => (router.push(`/users/edit/${user.id}`))}>
        Update Account Info
      </Button>
    </div>
  );
}
