'use client'
import { useEffect } from "react";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";


export default function Token() {


      async function requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            // Replace with your actual VAPID key
            vapidKey: process.env.PUBLIC_VAPID_KEY,
          });
          console.log('Token Gen:', token);
         
        } else if (permission === 'denied') {
          alert('You denied notification permission.');
        }
      }
    
      useEffect(() => {
        requestPermission();
      }, []);
    
  
  return <h1>Token</h1>;
}
