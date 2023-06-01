import React, { useEffect, useState, useRef } from 'react';
import { ChatState } from '../Context/chatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellanious/ProfileModel';
import UpdateGroupChatModal from './miscellanious/UpdateGroupChatModal';
import backgroundImage from '../assests/Virat.jpg';
import backgroundImage2 from '../assests/VAB.jpg';
import axios from 'axios';
import './styles.css';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client";
import Lottie, { } from 'react-lottie';
import animationData from "../animations/typing.json";


const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const toast = useToast();
  const { user, selectedChat, setSelectedChat,notification, setNotification } = ChatState();
  const chatContainerRef = useRef();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);

      setMessages(data);
      setLoading(false);
      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: 'Failed to Load the Messages',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };
    useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true))
       socket.on("stop typing",() =>setIsTyping(false))
  }, []);
  

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {

    socket.on("message recieved", (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
    }
      } else {
        setMessages([...messages, newMessageRecieved]);   
      }
    });
  });
  

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit("stop typing", selectedChat._id)
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage('');
        const { data } = await axios.post(
          '/api/message',
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: 'Error Occurred!',
          description: 'Failed to send the Message',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing indicator logic
    if (!socketConnected) return; 
    if (!typing) {
      setTyping(true)
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime()
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);

  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            padding={3}
            bg="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflow="hidden"
            style={
              selectedChat.isGroupChat
                ? {
                    backgroundImage: `url(${backgroundImage2})`,
                    backgroundSize: 'cover',
                  }
                : {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                  }
            }
          >
            <Box
              display="flex"
              flexDirection="column"
              flex="1"
              overflowY="auto"
              ref={chatContainerRef}
            >
              {loading ? (
                <Spinner size="sd" width="10" height="30" alignSelf="auto" margin="auto" />
              ) : (
                <div className="messages">
                  <ScrollableChat messages={messages} style={{ justifyContent: 'flex-end' }} />
                </div>
              )}
            </Box>
            <FormControl onKeyDown={sendMessage} isRequired m={1}>
              {isTyping ? <div>
                <Lottie
                options={defaultOptions}
                  width={70}
                  style={{marginBottom: 15, marginLeft: 0}}
                />

              </div>:<></>}
              <Input
                variant="filled"
                background="#E0E0E0"
                placeholder="Enter a message.."
                onChange={typingHandler}
                value={newMessage}
                style={{
                  backgroundColor: '#ccc',
                }}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <Text fontSize="3xl" paddingBottom={3} fontFamily="Work sans">
            Click on a user or group to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;          
