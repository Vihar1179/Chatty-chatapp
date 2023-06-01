import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { ChevronDownIcon, BellIcon, EmailIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from 'react';
import { ChatState } from '../../Context/chatProvider';
import ProfileModal from './ProfileModel';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    // Implement your logic here to access the chat with the selected user
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const [,setIsNotificationReceived] = useState(false);
  const [bellIconColor, setBellIconColor] = useState("gray.500");

  useEffect(() => {
    // Check if there are any unread notifications
    if (notification.length > 0) {
      setIsNotificationReceived(true);
      setBellIconColor("green.500"); // Set the bell icon color to red
    } else {
      setIsNotificationReceived(false);
      setBellIconColor("black.500"); // Set the bell icon color back to its original variant
    }
  }, [notification]);

  const handleNotificationClick = () => {
    setIsNotificationReceived(false);
    setBellIconColor("black.500"); // Set the bell icon color back to its original variant
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width="100%"
        padding="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to find and chat" hasArrow placement="bottom-end">
          <Button variant='ghost' onClick={onOpen}>
            <i className="fa fa-search" aria-hidden="true"></i>
            <Text d={{ base: "none", md: 'flex' }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Chatty
        </Text>
        <div>
          <Menu>
            <MenuButton padding={1}>
              <BellIcon
                fontSize="2xl"
                m={1}
                color={bellIconColor}
                onClick={handleNotificationClick}
              />
            </MenuButton>
            <MenuList paddingLeft={2}>
              {!notification.length && "No new Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}` : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
              <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
          <Tooltip label="Mail to Report a user" hasArrow placement="bottom-end">
            <Button variant='ghost' ml={2} onClick={() => window.open("mailto:viharbammidi@gmail.com")}>
              <EmailIcon boxSize={5} />
            </Button>
          </Tooltip>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display='flex' padding={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult && searchResult.length > 0 ? (
                searchResult.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              ) : (
                <Text>No results found.</Text>
              )
            )}
            {loadingChat && <Spinner m1="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
