import { useState } from 'react';
import { Route, Router, Text, useText } from '@urban-bot/core';
import { chatGPT } from './services/chatgpt';

type ChatGPTResponse = {
    id: string;
    text: string;
};

function Echo() {
    const [text, setText] = useState('Say something');

    useText(({ text }) => {
        setText(text);
    });

    return (
        <Text>
            <i>{text}</i>
        </Text>
    );
}

function ChatGPT() {
    const [text, setText] = useState('ChatGPT enabled');
    const [response, setResponse] = useState<ChatGPTResponse>();

    useText(async ({ text }) => {
        const newResponse = await chatGPT(text, {
            parentMessageId: response?.id,
        });
        setResponse(newResponse);
        setText(newResponse.text);
    });

    return (
        <Text>
            <i>{text}</i>
        </Text>
    );
}

export function App() {
    return (
        <>
            <Text>Welcome to Mirs Bot! Type /chatgpt or /echo.</Text>
            <Router>
                <Route path="/chatgpt">
                    <ChatGPT />
                </Route>
                <Route path="/echo">
                    <Echo />
                </Route>
            </Router>
        </>
    );
}
