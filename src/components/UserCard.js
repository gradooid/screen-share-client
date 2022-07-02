import { Avatar, Box, Heading } from '@chakra-ui/react';

function UserCard({ avatarUrl, username }) {
  return (
    <Box
      backgroundColor="gray.800"
      width="300px"
      height="180px"
      borderRadius="lg"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      paddingX="5"
      paddingY="4"
      gap="2"
    >
      <Avatar name={username} size="lg" />
      <Heading as="h5" size="md" color="gray.100">
        {username}
      </Heading>
    </Box>
  );
}

export default UserCard;
