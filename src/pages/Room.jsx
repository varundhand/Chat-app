import React, { useEffect, useState } from 'react'
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig'
import { ID,Query,Client } from 'appwrite' // ID is custom appwrite function which generates a unique id for us 
import { Trash2 } from 'react-feather'
import Header from '../components/Header'
// import { useParams } from 'react-router-dom'

const Room = () => {
  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState('')

  // const accountDetails = useParams();

  // console.log(accountDetails,'yeet')
  useEffect(() => {  
    getMessages();
     // it allows us to subscribe to a series of 'Channels' and recieve callbacks of the events relating to that particular Channel
    // Hence we subscribe this channel when we first load the page; Thats why its in useEffect hook
    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
      // Create Message
      if(response.events.includes("databases.*.collections.*.documents.*.create")){
        console.log('a new message was CREATED')
        setMessages(prevState => [response.payload,...prevState])
      }
      // Delete Message
      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
        console.log('a message was DELETED!')
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
      }
  });
  
  return () => { // CleanUp function
    unsubscribe();
  }

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

  const deleteMessage = async (message_id) => { // we will pass in the message id for the message we wanna delete
    databases.deleteDocument(DATABASE_ID,COLLECTION_ID_MESSAGES,message_id)
    // setMessages([...messages].filter(message => message.$id !== message_id)) // Alter
  }
  // console.log(messages)
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

    // setMessages(prevState => [response,...messages])

    setMessageBody('')
  }

  return (
    <main className='container'>
      <Header/>
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
              <div className="message--header">
                <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                <div>
                  <Trash2 
                    className='delete--btn'
                    onClick={() => deleteMessage(message.$id)}
                  />
                </div>
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
