import React from 'react'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'

export function TodoList() {
  return (
    <div className='w-[330px] m-2'>
      <Flex 
        className='bg-gray-200 rounded-lg p-4'
        direction='column'
      >
        <Text>想新增什麼待辦事項嗎?</Text>
        <Flex justify='between' gap='2'>
          <TextField.Root
            placeholder='任務名稱'
            className='flex-grow'
          />
          <Button variant='outline'>
            新增
          </Button>
        </Flex>
        <div>
          <button>
            🍅
          </button>
          <button>
            🍅
          </button>
          <button>
            🍅
          </button>
          <button>
            🍅
          </button>
        </div>
      </Flex>
      <Flex>
        // TODO: 任務列表
      </Flex>
    </div>
  )
}
