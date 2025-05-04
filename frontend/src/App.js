import React from 'react';
import { Theme, Button, Heading, Flex, Container } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import './index.css'

function App() {
  return (
    <Theme>
      <Flex
        direction='column'
        height='100vh'
      >
        <Flex
          justify='between'
          p='2'
        >
          <Heading>Project Cacodemon</Heading>
          <Button>
            註冊
          </Button>
        </Flex>

        <Flex
          align='center'
          justify='center'
          flexGrow='1'
        >
          工事中👷
        </Flex>
      </Flex>
    </Theme>
  );
}

export default App;