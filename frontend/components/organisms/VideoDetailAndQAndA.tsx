import React from 'react'
import { Text, Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react'

export function VideoDetailAndQAndA({
  videoDescription,
}: {
  videoDescription: string
}) {
  return (
    <Tabs
      colorScheme="green"
      isFitted
      m="20px"
      boxShadow="0px 4px 6px -2px #0000000D, 0px 10px 15px -3px #0000001A"
    >
      <TabList>
        <Tab>動画の内容</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text whiteSpace="pre-wrap">{videoDescription}</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
