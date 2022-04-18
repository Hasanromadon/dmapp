import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';

export default function ChatInput({ sendMessage }) {
  return (
    <InputEmoji
      cleanOnEnter
      onEnter={(e) => sendMessage(e)}
      placeholder="Type a message"
    />
  );
}
