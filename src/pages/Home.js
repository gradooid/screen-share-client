import {
  Container,
  Box,
  Stack,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { io } from 'socket.io-client';

import { urls } from '../config/urls';
import { socket } from '../config/socket';
import { UserContext } from '../context/UserContext';

function Home() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function login(e) {
    e.preventDefault();

    const userId = nanoid();
    setUser({
      id: userId,
      username,
    });
  }

  function createRoom() {
    if (!user) {
      return;
    }

    socket.emit('room:create', user, ({ status, data }) => {
      if (status === 200) {
        console.log(data);
        navigate(`${urls.room}/${data.id}`);
      } else {
        console.log(data);
      }
    });
  }

  function joinRoom(e) {
    e.preventDefault();

    if (!user) {
      return;
    }

    navigate(`${urls.room}/${roomId}`);
  }

  return (
    <Container maxWidth="container.lg">
      <Heading size="xl" mb={1} color="white">
        Create or join chat
      </Heading>

      <Stack>
        {user === null && (
          <Stack as="form" onSubmit={login} direction="row">
            <Input
              placeholder="Username"
              maxWidth="xs"
              autoComplete="off"
              variant="filled"
              _focus={{
                color: 'white',
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button type="submit">Login</Button>
          </Stack>
        )}

        <Box>
          <Button
            onClick={createRoom}
            disabled={user === null}
            colorScheme="blue"
          >
            Create
          </Button>
        </Box>

        <Stack as="form" onSubmit={joinRoom} direction="row">
          <Input
            placeholder="Room id"
            maxWidth="xs"
            autoComplete="off"
            variant="filled"
            _focus={{
              color: 'white',
            }}
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button type="submit" disabled={user === null}>
            Join
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Home;
