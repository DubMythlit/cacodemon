import React from 'react'
import { Theme, Heading, Flex } from '@radix-ui/themes'
import { MemberSection } from './component/MemberSection'
import { AuthProvider } from './context/AuthContext'

import '@radix-ui/themes/styles.css'
import './index.css'

function App() {
  return (
    <AuthProvider>
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
            <MemberSection />
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
    </AuthProvider>
  )
}

export default App