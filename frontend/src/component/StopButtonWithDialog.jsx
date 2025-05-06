import React from 'react'
import { Dialog, Button, Flex } from '@radix-ui/themes'

export function StopButtonWithDialog({ onStopClick }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          停止
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          停止番茄
        </Dialog.Title>
        <Dialog.Description>
          確定要停止時鐘嗎？
        </Dialog.Description>
        <Flex direction='row' gap='1' justify='end'>
          <Dialog.Close>
            <Button>
              取消
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={onStopClick}
            >
              確定
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
