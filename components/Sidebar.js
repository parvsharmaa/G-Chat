import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const showCred = () => {
    alert(user.email);
  };

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // add chat to db, if it doesn't already exists
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} />

        <IconsContainer>
          <IconButton>
            <ChatIcon onClick={showCred} />
          </IconButton>

          <IconButton>
            <AddIcon onClick={createChat} />
          </IconButton>

          <IconButton>
            <ExitToAppIcon onClick={() => auth.signOut()} />
          </IconButton>
        </IconsContainer>
      </Header>
      <Container>
        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search in Chats" />
        </Search>

        <Sidebarbutton onClick={createChat}>new Chat</Sidebarbutton>

        {/* List of Chats */}
        {chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </Container>

      <Footer>
        <span>developed by Parv ™</span>
      </Footer>
    </Container>
  );
}

export default Sidebar;

const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
  border-top: 1px solid whitesmoke;
  font-size: 14px;
  color: grey;
`;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  padding-left: 10px;
  outline-width: 0;
  border: none;
  flex: 1;
`;

const Sidebarbutton = styled(Button)`
    width: 100%;
    &&& {
        border-top: 1px solid whitesmoke,
        border-bottom: 1px solid whitesmoke,
    }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
