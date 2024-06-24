import { useCallback, useRef, useState } from 'react'
import { FiGlobe } from 'react-icons/fi'
import { SupportedLocale, SUPPORTED_LOCALES, SwapWidget } from '@uniswap/widgets'

// ↓↓↓ Don't forget to import the widgets' fonts! ↓↓↓
import '@uniswap/widgets/fonts.css'
// ↑↑↑

import { useActiveProvider } from '../connectors'
import { JSON_RPC_URL } from '../constants'
import Web3Connectors from './Web3Connectors'
import styles from '../styles/Home.module.css'

const TOKEN_LIST = 'https://ipfs.io/ipns/tokens.uniswap.org';
const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

/*
  "@web3-react/core": "^8.0.22-beta.0",
  "@web3-react/empty": "^8.0.11-beta.0",
  "@web3-react/metamask": "^8.0.18-beta.0",
  "@web3-react/types": "^8.0.11-beta.0",
  "@web3-react/walletconnect": "^8.0.25-beta.0",
  "@walletconnect/ethereum-provider": "^1.7.1",

  "@uniswap/widgets": "^1.0.0",
  "@ethersproject/providers": "^5.5.1",

  @uniswap/widgets @web3-react/core @web3-react/empty @web3-react/metamask @web3-react/types @web3-react/walletconnect @walletconnect/ethereum-provider @ethersproject/providers
*/

export default function App() {
  // When a user clicks "Connect your wallet" in the SwapWidget, this callback focuses the connectors.
  const connectors = useRef < HTMLDivElement > (null)
  const focusConnectors = useCallback(() => connectors.current?.focus(), [])

  // The provider to pass to the SwapWidget.
  // This is a Web3Provider (from @ethersproject) supplied by @web3-react; see ./connectors.ts.
  const provider = useActiveProvider()

  // The locale to pass to the SwapWidget.
  // This is a value from the SUPPORTED_LOCALES exported by @uniswap/widgets.
  const [locale, setLocale] = useState < SupportedLocale > ('en-US')
  const onSelectLocale = useCallback((e) => setLocale(e.target.value), [])

  return (
    <div className={styles.container}>
      <div className={styles.i18n}>
        <label style={{ display: 'flex' }}>
          <FiGlobe />
        </label>
        <select onChange={onSelectLocale}>
          {SUPPORTED_LOCALES.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>Uniswap Swap Widget</h1>

        <div className={styles.demo}>
          <div className={styles.connectors} ref={connectors} tabIndex={-1}>
            <Web3Connectors />
          </div>

          <div className={styles.widget}>
            <SwapWidget
              jsonRpcUrlMap={JSON_RPC_URL}
              // jsonRpcEndpoint={JSON_RPC_URL}
              provider={provider}
              tokenList={TOKEN_LIST}
              locale={locale}
              // onConnectWallet={focusConnectors}
              onConnectWalletClick={focusConnectors}
              defaultInputTokenAddress="NATIVE"
              defaultInputAmount="1"
              defaultOutputTokenAddress={UNI}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
