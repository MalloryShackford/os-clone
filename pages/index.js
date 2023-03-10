import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { useWeb3 } from '@3rdweb/hooks'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { createClient } from '@sanity/client'



const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

export const client = createClient({
   projectId: 'wllsk2fg',
    dataset: 'production',
    token: 'skZfVbgfldW4GSgGLlNl6cAzRIuwaSU6oKC2SJbVIGm3PMzaOHw3zoIofoUnUp34uDBgS4ex59IxwaWsuddEy0I0uiG3qvuSdhvjqJSvtQx1XkEQC048fCEo5JFcYBewEDapXfkY2XrJ0a4bizBD21YHBSarEojXUiXd3LLeRXxMmZba4JLU',
    useCdn: false,
})
export default function Home() {
  const { address, connectWallet } = useWeb3()

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }

  useEffect(() => {
    if (!address) return
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      }
  
      const result = await client.createIfNotExists(userDoc)

      welcomeUser(result.userName)
    })()
  }, [address])

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      {address ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWallet('injected')}
          >
            Connect Wallet
          </button>
          <div className={style.details}>
            Must be connected
     <br /> to Goerli Test Network
     <br /> to be able to run this app.
          </div>
        </div>
      )}
    </div>
  )
}
