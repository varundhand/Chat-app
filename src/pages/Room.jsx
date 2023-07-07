import React, { useEffect, useState } from 'react'
import { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig'

const Room = () => {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages();
  }, [])

  const getMessages = async () => {
    const response = await databases.listDocuments(DATABASE_ID,COLLECTION_ID_MESSAGES)
    console.log('REPSONSE:', response.documents)
    setMessages(response?.documents)
  }

  return (
    <div>
      <div className="">
        {messages.map(message => (
          <div className="" key={message.$id}>

            <div className="">
              <p>{message.$createdAt}</p>
            </div>

            <div>
              <span>{message.body}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Room
