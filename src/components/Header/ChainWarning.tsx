import { Trans } from '@lingui/macro'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import { useMemo } from 'react'
import { AlertOctagon } from 'react-feather'
import styled from 'styled-components/macro'
import { ExternalLink, MEDIA_WIDTHS } from 'theme'

const BodyRow = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 12px;
`
const CautionIcon = styled(AlertOctagon)`
  color: ${({ theme }) => theme.black};
`
const Link = styled(ExternalLink)`
  color: ${({ theme }) => theme.black};
  text-decoration: underline;
`
const TitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
`
const TitleText = styled.div`
  color: black;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin: 0px 12px;
`
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.yellow3};
  border-radius: 12px;
  top: 5rem;
  display: none;
  max-width: 348px;
  padding: 16px 20px;
  position: absolute;
  right: 16px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: none;
  }
`

export function ChainWarning() {
  const { chainId } = useActiveWeb3React()
  const info = CHAIN_INFO[chainId ?? SupportedChainId.MAINNET]
  const label = info?.label

  const isHidden = useMemo(() => {
    if (chainId === SupportedChainId.RINKEBY) {
      return true
    }
    if (chainId !== SupportedChainId.MAINNET && chainId !== SupportedChainId.OPTIMISM) {
      return true
    }
    return false
  }, [chainId])

  return (
    <Wrapper
      style={{
        display: isHidden ? 'none' : 'block',
      }}
    >
      <TitleRow>
        <CautionIcon />
        <TitleText>
          <Trans>Network Warning</Trans>
        </TitleText>
      </TitleRow>
      <BodyRow>{chainId !== SupportedChainId.RINKEBY ? <Trans>please use RINKEBY network.</Trans> : null}</BodyRow>
    </Wrapper>
  )
}
