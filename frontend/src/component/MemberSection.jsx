import React from 'react'
import { Flex } from '@radix-ui/themes'

import { LoginDialog } from './LoginDialog'
import { SignupDialog } from './SignupDialog'
import { useAuth } from '../hook/useAuth'

export function MemberSection() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return null
  }

  return (
    <Flex gap='1'>
      <LoginDialog />
      <SignupDialog />
    </Flex>
  )
}
