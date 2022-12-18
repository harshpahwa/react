import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Attachment,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';

// we'll reuse `useClient` hook from the "Add a Channel List" example
import { useClient } from './Hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicm95YWwtYnJvb2stMyJ9.58woZSkNBWr9TVrreHiH7sdAP14ZH6ROgK2yV-BbqIA';

const user = {
  id: 'royal-brook-3',
  name: 'royal-brook-3',
  image: 'https://getstream.io/random_png/?id=royal-brook-3&name=royal-brook-3',
};

const filters = { type: 'messaging', members: { $in: ['royal-brook-3'] } };
const sort = { last_message_at: -1 };

const attachments = [
  {
    image: 'https://images.pexels.com/photos/21696/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Welcome',
    type: 'Message',
    url: 'https://goo.gl/ppFmcR',
  },
];

const CustomAttachment = (props) => {
  const { attachments } = props;
  const [attachment] = attachments || [];

  if (attachment?.type === 'product')
    return (
      <div>
        Product:
        <a href={attachment.url} rel='noreferrer'>
          <img alt='custom-attachment' height='100px' src={attachment.image} />
          <br />
          {attachment.name}
        </a>
      </div>
    );

  return <Attachment {...props} />;
};

const App = () => {
  const chatClient = useClient({ apiKey: 'px36cwnqh99d', userData: user, tokenOrProvider: userToken });

  useEffect(() => {
    if (!chatClient) return;

    const initAttachmentMessage = async () => {
      const [channelResponse] = await chatClient.queryChannels(filters, sort);

      await channelResponse.sendMessage({
        text: 'You should discuss your ideas here, may you scale the heights like never seen before',
        attachments,
      });
    };

    initAttachmentMessage();
  }, [chatClient]);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme='messaging light'>
      <ChannelList filters={filters} sort={sort} />
      <Channel Attachment={CustomAttachment}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;