import React,{useState,useEffect} from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions'
import { urlBase64ToUint8Array } from '@/utils/constant'

const NotificationManager = () => {
    const [isSupported, setIsSupported] = useState<boolean>(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(null)
    const [message, setMessage] = useState<string>('')
   
    useEffect(() => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        setIsSupported(true)
        registerServiceWorker()
      }
    }, [])
   
    async function registerServiceWorker() {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    }

    async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
    })
    setSubscription(sub)
    await subscribeUser(sub)
    }
    
    async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
    }

    async function sendTestNotification() {
    if (subscription) {
        await sendNotification(message)
        setMessage('')
    }
    }
    
    if (!isSupported) {
    return <p className='text-[#88226F]'>Push notifications are not supported in this browser.</p>
    }
    return (
        <div className='absolute p-3 rounded-lg w-full bg-[#eee]'>
            {subscription ? (
                <>
                <p className='text-[#88226F]'>You are subscribed to push notifications.</p>
                <button className='text-[#88226F]' onClick={unsubscribeFromPush}>Unsubscribe</button>
                <input
                    type="text"
                    placeholder="Enter notification message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className='text-[#88226F]' onClick={sendTestNotification}>Send Test</button>
                </>
            ) : (
                <>
                <p className='text-[#88226F]'>You are not subscribed to push notifications.</p>
                <button className='text-[#88226F]' onClick={subscribeToPush}>Subscribe</button>
                </>
            )}
        </div>
    )
}

export default NotificationManager