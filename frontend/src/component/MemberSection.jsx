import React, { useEffect, useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'

import { LoginDialog } from './LoginDialog'
import { SignupDialog } from './SignupDialog'
import { useAuth } from '../hook/useAuth'
import { axios } from '../api'

export function MemberSection() {
  const { isAuthenticated, logout, token } = useAuth()
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    axios.get('/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status !== 200) {
        logout()
        return
      }

      setDisplayName(response.data.displayName)
    }).catch(console.error)
  }, [isAuthenticated])

  if (isAuthenticated) {
    return (
      <Flex
        align='center'
        gap='2'
      >
        {`歡迎回來🎉 ${displayName}`}
        <Button onClick={logout}>
          登出
        </Button>
      </Flex>
    )
  }

  return (
    <Flex gap='1'>
      <LoginDialog />
      <SignupDialog />
    </Flex>
  )
}
