import React from 'react'
import { Theme, Heading, Flex } from '@radix-ui/themes'
import { MemberSection } from './component/MemberSection'
import { AuthProvider } from './context/AuthContext'
import { MutateProvider } from './context/MutateContext'
import { CurrentTaskProvider } from './context/CurrentTaskContext'
import { Pomodoro } from './component/Pomodoro'
import { TodoList } from './component/todo-list/TodoList'

import '@radix-ui/themes/styles.css'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <MutateProvider>
        <CurrentTaskProvider>
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

              <Flex flexGrow='1'>
                <Pomodoro />
                <TodoList />
              </Flex>
            </Flex>
          </Theme>
        </CurrentTaskProvider>
      </MutateProvider>
    </AuthProvider>
  )
}

export default App