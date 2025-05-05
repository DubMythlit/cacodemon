import React, { useState } from 'react'
import {
  Button,
  Dialog,
  Flex,
  TextField,
  Text,
  Callout
} from '@radix-ui/themes'
import { axios } from '../api'
import { useAuth } from '../hook/useAuth'

export function SignupDialog() {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { login } = useAuth()

  const submit = async () => {
    if (username.length === 0 || password.length === 0) {
      setErrorMsg('請輸入使用者名稱與密碼')
      return
    }
    if (password !== password2) {
      setErrorMsg('兩次輸入的密碼須保持一致')
      return
    }


    setErrorMsg('')
    const response = await axios.post('/api/user/create', {
      username,
      password
    })
    if (response.status !== 200) {
      setErrorMsg(response.data)
      return
    }

    setOpen(false)
    login(response.data.token)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger asChild>
        <Button>
          註冊
        </Button>
      </Dialog.Trigger>

      <Dialog.Content width='400px'>
        <Dialog.Title>
          註冊
        </Dialog.Title>
        <Dialog.Description mb='2'>
          請輸入你的使用者名稱與密碼
        </Dialog.Description>
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
              密碼：
            </Text>
            <TextField.Root
              type='password'
              maxLength={20}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
          <Flex direction='column' align='start'>
          <Text
              as='span'
              size='2'
              color='gray'
            >
              請再次確認密碼：
            </Text>
            <TextField.Root
              type='password'
              maxLength={20}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Flex>

          {errorMsg.length > 0 && (
            <Callout.Root color='red'>
              <Callout.Text>
                {errorMsg}
              </Callout.Text>
            </Callout.Root>
          )}

          <Flex justify='end' gap='1'>
            <Dialog.Close asChild>
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
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
