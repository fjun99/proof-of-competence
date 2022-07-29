import React from 'react'
import NextLink from "next/link"
import { Flex, useColorModeValue, Spacer, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { TITLE } from 'utils/constants'
import { AccountMenu } from './AccountMenu'
import { APP_CONFIG } from 'utils/config'

export default function Header() {

  return (
    <Flex as='header' bg={useColorModeValue('gray.100', 'gray.900')} p={4} alignItems='center'>
      <LinkBox>
        <NextLink href={'/'} passHref>
          <LinkOverlay><Heading size="md">{TITLE}</Heading></LinkOverlay>
        </NextLink>
      </LinkBox>      

      <Spacer />
      
      {APP_CONFIG.DEFAULT_TOPIC_QUEST
       ? <LinkBox mx='4'>
          <NextLink href={'/lists'} passHref>
            <LinkOverlay>Quest Lists </LinkOverlay>
          </NextLink>
        </LinkBox>
       : <></>
      }

      <AccountMenu />
    </Flex>
  )
}
