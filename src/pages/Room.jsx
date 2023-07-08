import React, { useEffect, useState } from 'react'
import { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig'
import { ID,Query } from 'appwrite' // custom appwrite function which generates a unique id for us 

const Room = () => {

  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState('')

  useEffect(() => {
    getMessages();
  }, [])

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(5)
      ]
    )
    console.log('REPSONSE:', response.documents)
    setMessages(response?.documents)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let payload ={
      body: messageBody
    }

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
    )

    console.log(response)

    setMessages(prevState => [response,...messages])

    setMessageBody('')
  }

  return (
    <main className='container'>
       <div className="room--container">

      <form action="" id='message--form' onSubmit={handleSubmit}>
        <div>
            <textarea 
              required
              placeholder='Type your message...'
              maxLength='1000'
              onChange={(e) => {setMessageBody(e.target.value)}}
              value={messageBody}
            >
            </textarea>

            <div className='send-btn--wrapper'>
              <input className='btn btn--secondary' type="submit" value='Send'/>
            </div>
        </div>
      </form>

     
        <div className="">
          {messages.map(message => (
            <div key={message.$id} className='message--wrapper' >
              <div className="message-header">
                <small className='message-timestamp'>{message.$createdAt}</small>
              </div>

              <div className='message--body'>
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
      
    </main>
  )
}

export default Room
