import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signIn, signOut } from '../utils/auth';
import Logo from '../assets/logo.png';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function NavBar() {
  const { user } = useAuth();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Image height={50} width={70} className="logo" alt="Bangazon Logo" src={Logo} />
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none', justifyContent: 'center' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >BANGAzON
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <MenuItem>
                  <Typography>
                    <Link href={`/users/${user.id}`}>Account Details</Link>
                  </Typography>
                </MenuItem>
              ) : (
                ''
              )}
              <MenuItem onClick={handleCloseUserMenu}>
                {user ? (
                  <Typography onClick={signOut} textAlign="center">
                    Logout
                  </Typography>
                ) : (
                  <Typography textAlign="center" onClick={signIn}>
                    Login/Register
                  </Typography>
                )}
              </MenuItem>
            </Menu>
            {user ? (
              <IconButton aria-label="cart" onClick={(() => router.push(`/users/shoppingCart/${user.id}`))}>
                <StyledBadge badgeContent={0} color="warning"> {/* dynamic cart quantity will go here */}
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            ) : (
              ''
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
