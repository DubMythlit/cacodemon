import React, { useState } from 'react'
import { Button,
  Dialog,
  Flex,
  TextField,
  Text,
  Callout
 } from '@radix-ui/themes'
import { useAuth } from '../hook/useAuth'
import { axios } from '../api'

export function LoginDialog() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { login } = useAuth()

  const submit = async () => {
    const response = await axios.post('/api/auth/login', {
      username,
      password
    })
    
    if (response.status === 403) {
      setErrorMsg('帳號或密碼錯誤')
      return
    }

    if (response.status !== 200) {
      setErrorMsg('登入失敗')
      return
    }
    
    setErrorMsg('')
    login(response.data.token)
  } 

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          登入
        </Button>
      </Dialog.Trigger>

      <Dialog.Content width='400px'>
        <Dialog.Title>
          登入
        </Dialog.Title>
        <Flex direction='column' gap='1'>
          <Flex direction='column' align='start'>
            <Text
              as='span'
              size='2'
              color='gray'
            >
              帳號
            </Text>
            <TextField.Root 
              placeholder='請輸入帳號' 
              maxLength={20}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Flex>
          
          <Flex direction='column' align='start'>
            <Text
              as='span'
              size='2'
              color='gray'
            >
              密碼
            </Text>
            <TextField.Root 
              placeholder='請輸入密碼'
              type='password'
              maxLength={20}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
        </Flex>

        {errorMsg.length > 0 && (
          <Callout.Root color='red'>
            <Callout.Text>
              {errorMsg}
            </Callout.Text>
          </Callout.Root>
        )}

        <Flex justify='end' gap='1'>
          <Dialog.Close>
            <Button color='red'>
              取消
            </Button>
          </Dialog.Close>
          <Button
            onClick={submit}
            disabled={username.length === 0 || password.length === 0}
          >
            送出
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
