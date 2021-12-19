import { Button } from "@material-ui/core";
import Head from "next/head";
import Link from 'next/link';
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <Container>
            <Head>
                <title>G-Chat | Login</title>
            </Head>

            <LoginContainer>
             <Logo 
                src="https://upload.wikimedia.org/wikipedia/commons/3/33/Google_Hangouts_Chat_icon_%282017-2020%29.png"
                onClick={signIn}
             />
             <Button  onClick={signIn}>Sign in with Google</Button>
            </LoginContainer>
            
            <Credits>
                <span>developed by Parv</span>
            </Credits>

        </Container>
    )
}

export default Login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: grey;
`;

const Credits = styled.div`
    position: sticky;
`;

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: gainsboro;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7)
`;

const Logo = styled.img`
    height: 200px;
    width: 180px;
    margin-bottom: 50px;
`;