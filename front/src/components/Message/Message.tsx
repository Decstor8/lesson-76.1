import React from 'react';
import dayjs from 'dayjs';
import {Messages} from "../../types";
import { Card, CardContent, Typography } from '@mui/material';

interface MessageProps {
    message: Messages;
};

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <Card style={{ marginBottom: '16px', backgroundColor: '#eee' }}>
        <CardContent>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            {message.author}
          </Typography>
          <Typography style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
            {dayjs(message.createdAt).format('DD.MM.YYYY HH:mm')}
          </Typography>
          <Typography style={{ fontSize: '16px' }}>
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    );
};
export default Message;