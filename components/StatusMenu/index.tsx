import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
  Box,
  Text,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { useAccount } from 'wagmi'
import { useApproval, useChainId } from '@/hooks'
import { getContractAddress } from '@/utils/contractAddresses'
import useTranslation from 'next-translate/useTranslation'
import { Profile } from '@/components/Profile'
import { Balance } from '@/components/Balance'

interface Props {
  children?: ReactElement
}

const StatusMenu: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation('common')

  const { chainId } = useChainId()
  const henkakuV2 = getContractAddress({
    name: 'henkakuErc20',
    chainId: chainId
  }) as `0x${string}`
  const nengajo = getContractAddress({
    name: 'nengajo',
    chainId: chainId
  }) as `0x${string}`
  const { address } = useAccount()
  const { approved } = useApproval(henkakuV2, nengajo, address)

  return (
    <Popover>
      <PopoverTrigger>
        <Button>{children ?? t('STATUS_BUTTON')}</Button>
      </PopoverTrigger>
      <PopoverContent maxW="100%" width="370px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text fontWeight="bold">{t('STATUS_TITLE')}</Text>
        </PopoverHeader>
        <PopoverBody>
          <Profile />
          <Balance />
          {approved && (
            <Box mt={3} mb={3}>
              <Text>
                あなたは、次のアドレスのコントラクトにHENKAKU支払いの許可を与えました（文面要検討）。
                <br />
                {nengajo.toString()}
              </Text>
            </Box>
          )}
          {!approved && (
            <Box mt={3} mb={3}>
              承認されていません。HENKAKU支払いの許可を与えてください。
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
export default StatusMenu