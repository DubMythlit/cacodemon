import React from 'react'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'

export function SignupDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>
          註冊
        </Button>
      </Dialog.Trigger>

      <Dialog.Content width='400px'>
        <Dialog.Title>
          登入
        </Dialog.Title>
        <Dialog.Description mb='2'>
          請輸入你的使用者名稱與密碼
        </Dialog.Description>
        <Flex direction='column' gap='1'>
          <Flex align='center'>
            帳號：<TextField.Root maxLength={20} />
          </Flex>
          <Flex align='center'>
            密碼：<TextField.Root type='password' maxLength={20} />
          </Flex>

          <Flex justify='end' gap='1'>
            <Dialog.Close asChild>
              <Button color='red'>
                取消
              </Button>
            </Dialog.Close>
            <Button>
              送出
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
