import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, Button, Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

function UserInfoCard({ userObj }) {
  const router = useRouter();
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          {userObj.first_name} {userObj.last_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{userObj.email}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {userObj.street_address}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {userObj.city}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {userObj.state}, {userObj.zipcode}
        </Typography>
        <Button onClick={() => router.push(`/users/edit/${userObj.id}`)}>Update Profile</Button>
      </CardContent>
    </Card>
  );
}

UserInfoCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    street_address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.number,
  }).isRequired,
};

export default UserInfoCard;
