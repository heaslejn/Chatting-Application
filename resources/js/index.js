const nameInput = document.getElementById(`my-name-input`);
const myMessage = document.getElementById(`my-message`);
const sendButton = document.getElementById(`send-button`);
const chatBox = document.getElementById(`chat`);

async function updateMessages(){
  // Fetch messages
  const messages = await fetchMessages();

  // Loop over the messages. Inside the loop we will
  // get each message
  // format it
  //add it to the chatbox
  let formattedMessages = ``;
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
  updateMessages();

  const MILLISECONDS_IN_TEN_SECONDS = 10000;
  setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
}

const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

async function fetchMessages(){
  const response = await fetch(serverURL);
  return await response.json();
}

function formatMessage(message, myNameInput){
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
    return `
    <div class = "mine messages">
      <div class = "message">
          ${message.text}
      </div>
      <div class = "sender-info">
          ${formattedTime}
      </div>
    </div>
    `;
  } else {
    return `
          <div class = "yours messages">
              <div class = "message">
                  ${message.text}
              </div>
              <div class = "sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `;
  }
}

function unavailable(){
  myMessage.disabled = true;
  myMessage.addEventListener(`change`, stateHandle);

  function stateHandle(myMessage){
    if(document.getElementById(`my-name-input`).value === ``){
      myMessage.disabled = true;
    } else {
      myMessage.disabled = false;
      localStorage.setItem(`nameInput`, `my-name-input`);
    }
  }
}

function sendMessages(username, text){
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  };

  fetch (serverURL, {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`
    },
    body: JSON.stringify(newMessage)
  });
}
    
sendButton.addEventListener(`click`, function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();

  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender, message);
  myMessage.value = ``;
});