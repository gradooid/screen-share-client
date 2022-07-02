import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  GridItem,
  Stack,
  Text,
  Heading,
  Button,
  ButtonGroup,
  IconButton,
  Icon,
  Box,
  Wrap,
  Avatar,
} from '@chakra-ui/react';
import {
  BsFillChatLeftTextFill,
  BsFillPersonFill,
  BsTelephoneFill,
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { TbScreenShare, TbScreenShareOff } from 'react-icons/tb';

import { UserContext } from '../context/UserContext';
import { socket } from '../config/socket';
import { urls } from '../config/urls';
import UserCard from '../components/UserCard';

const activeButtonProps = {
  colorScheme: 'blue',
  variant: 'solid',
};

function Room() {
  const [room, setRoom] = useState(null);
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  const [screenShare, setScreenShare] = useState(false);

  const { roomId } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate(urls.home);
      return;
    }

    socket.emit('room:join', roomId, user, ({ status, data }) => {
      if (status === 200) {
        setRoom(data);
        console.log(data);
      } else {
        console.log(data);
      }
    });

    return () => {
      socket.emit('room:leave', roomId, user, ({ status, data }) => {
        console.log({ status, data });
      });
    };
  }, [navigate, roomId, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    socket.on('user:joined', onUserJoined);
    socket.on('user:left', onUserLeft);

    return () => {
      socket.off('user:joined', onUserJoined);
      socket.off('user:left', onUserLeft);
    };
  }, [user]);

  function onUserJoined(user) {
    setRoom((prev) => ({
      ...room,
      users: [...prev.users, user],
    }));
  }

  function onUserLeft(user) {
    setRoom((prev) => ({
      ...room,
      users: prev.users.filter(({ id }) => id !== user.id),
    }));
  }

  return (
    <Grid
      gridTemplateColumns="1fr 250px"
      paddingX="7"
      paddingY="5"
      height="100vh"
    >
      <GridItem>
        <Stack height="100%">
          <Wrap justify="center" height="100%">
            {room &&
              room.users.map((roomUser) => (
                <UserCard key={roomUser.id} username={roomUser.username} />
              ))}
          </Wrap>

          <ButtonGroup
            variant="ghost"
            colorScheme="whiteAlpha"
            justifyContent="center"
          >
            <IconButton
              variant={mic ? 'solid' : 'ghost'}
              colorScheme={mic ? 'gray' : 'whiteAlpha'}
              onClick={() => setMic(!mic)}
            >
              <Icon as={mic ? BsMicFill : BsMicMuteFill} />
            </IconButton>
            <IconButton
              variant={camera ? 'solid' : 'ghost'}
              colorScheme={camera ? 'gray' : 'whiteAlpha'}
              onClick={() => setCamera(!camera)}
            >
              <Icon as={camera ? BsCameraVideoFill : BsCameraVideoOffFill} />
            </IconButton>
            <IconButton
              variant={screenShare ? 'solid' : 'ghost'}
              colorScheme={screenShare ? 'gray' : 'whiteAlpha'}
              onClick={() => setScreenShare(!screenShare)}
            >
              <Icon as={screenShare ? TbScreenShareOff : TbScreenShare} />
            </IconButton>
            <IconButton>
              <Icon as={BsThreeDotsVertical} />
            </IconButton>
            <IconButton colorScheme="red" variant="solid">
              <Icon as={BsTelephoneFill} />
            </IconButton>
          </ButtonGroup>
        </Stack>
      </GridItem>

      <GridItem>
        <Stack>
          <Box display="flex" justifyContent="center">
            <ButtonGroup isAttached variant="outline" size="lg">
              <IconButton {...activeButtonProps}>
                <Icon as={BsFillPersonFill} />
              </IconButton>
              <IconButton variant="solid">
                <Icon as={BsFillChatLeftTextFill} />
              </IconButton>
            </ButtonGroup>
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            padding="5"
            backgroundColor="gray.100"
          >
            <Heading size="md" mb="3" textAlign="center">
              Users
            </Heading>

            <Stack>
              {room &&
                room.users.map((roomUser) => (
                  <Stack
                    key={roomUser.id}
                    direction="row"
                    justify="space-between"
                    align="center"
                  >
                    <Stack direction="row" align="center">
                      <Avatar name="John Doe" size="sm" />
                      <Text>{roomUser.username}</Text>
                    </Stack>

                    <Icon as={BsMicFill} color="gray.500" />
                  </Stack>
                ))}
            </Stack>
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  );
}

export default Room;
