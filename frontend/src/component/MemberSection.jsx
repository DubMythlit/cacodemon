import React from 'react'
import { Button, Flex } from '@radix-ui/themes'

import { LoginDialog } from './LoginDialog'
import { SignupDialog } from './SignupDialog'
import { useAuth } from '../hook/useAuth'

export function MemberSection() {
  const { isAuthenticated, logout } = useAuth()
  if (isAuthenticated) {
    return (
      <Button onClick={logout}>
        登出
      </Button>
    )
  }

  return (
    <Flex gap='1'>
      <LoginDialog />
      <SignupDialog />
    </Flex>
  )
}
