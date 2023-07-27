import React, { useEffect, useState } from 'react'
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig'
import { ID,Query,Client, Role,Permission } from 'appwrite' // ID is custom appwrite function which generates a unique id for us 
import { Trash2 } from 'react-feather'
import Header from '../components/Header'
// import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Send } from 'react-feather'

const Room = () => {
  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState('')

  const user = useSelector((state) => state.auth.accountDetails)

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
    // console.log('REPSONSE:', response.documents)
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
      user_id: user.$id,
      username: user.name,
      body: messageBody
    }

    let permissions = [
      Permission.write(Role.user(user.$id)) // 'Permission.write' gives access to CRUD functionality, hence authenticated user has access to CRUD
    ]

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions
    )

    // console.log(response)

    setMessageBody('')
  }
  
  const reversedMessages = [...messages].reverse()
  
  return (
    <main className='container'>
      <Header/>
       <div className="room--container">
   
      {/* Messages */}
      <div className=""> 
          {reversedMessages.map(message => (
            <div key={message.$id} className='message--wrapper' >
              <div className= {message?.username === user?.name ? "message--header--owner" : "message--header"}>
                <p>
                  {message?.username === user?.name ? (
                    <span>You</span>
                  ): (
                    <span>{message?.username}</span>
                  )}
                <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                </p>
                
                

              </div>
              
              <div className="parent--message--delete">
                <div className={message?.username === user?.name ? 'message--body--owner' : 'message--body'}>
                  <span>{message.body}</span>
                </div>
                {/* eslint-disable-next-line no-useless-escape */}
                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                    <Trash2 
                      className='delete--btn'
                      onClick={() => deleteMessage(message.$id)}
                    />
                  )}
              </div>
       
            </div>
          ))}
        </div>

      {/* Message Input Area */}
      <form action="" id='message--form' onSubmit={handleSubmit}>
        <div className='parent--textarea--btn'>
            <textarea 
              required
              placeholder='Type your message...'
              maxLength='1000'
              onChange={(e) => {setMessageBody(e.target.value)}}
              value={messageBody}
            >
            </textarea>

            <div className='send-btn--wrapper'>
              <button className='btn btn--secondary' type="submit" value='Send'>
                <Send size={18}/>
              </button>
            </div>
        </div>
      </form>

      </div>
      
    </main>
  )
}

export default Room
