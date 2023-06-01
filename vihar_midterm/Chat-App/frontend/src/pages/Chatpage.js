import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/chatProvider";
import SideDrawer from "../components/miscellanious/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

const Chatpage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);
    return (<div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            height="91.5vh"
            padding="10px"
        >
            {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
    </div>
    );
};

export default Chatpage;
