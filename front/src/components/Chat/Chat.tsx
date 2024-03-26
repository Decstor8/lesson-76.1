import React from 'react';
import Message from '../Message/Message';
import {Messages} from '../../types';
import { Button, Container, TextField } from '@mui/material';

interface ChatProps {
    messages: Messages[];
    onSubmit: (author: string, message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSubmit }) => {
    return (
      <Container maxWidth="sm">
      <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '20px', border: '1px solid #b2dfdb', borderRadius: '4px', marginBottom: '20px', width: '100%', backgroundColor: '#e0f2f1'
      }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          onSubmit(formData.get('author') as string, formData.get('message') as string);
          e.currentTarget.reset();
        }}
        style={{ width: '100%' }}
      >
        <TextField name="author" label="Ваше имя" variant="outlined" size="small" required fullWidth margin="normal" style={{ marginBottom: '10px' }}
        />
        <TextField name="message" label="Ваше сообщение" variant="outlined" size="small" required fullWidth margin="normal" style={{ marginBottom: '20px' }}
        />
        <Button type="submit" variant="contained" fullWidth 
        style={{ 
            backgroundColor: '#26a69a',
            color: 'white',
            padding: '10px 0',
            borderRadius: '4px',
          }}>
          Отправить
        </Button>
      </form>
    </Container>
    );
};

export default Chat;