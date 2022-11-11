const nameInput = document.getElementById(`my-name-input`);
const myMessage = document.getElementById(`my-messages`);
const sendButton = document.getElementById(`send-button`);
const chatBox = document.getElementById(`chat`);

async function updateMessages() {
  const messages = await fetchMessages();
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

async function fetchMessages() {
  return fetch(serverURL).then( response => response.json());
}

async function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;
  const notAllowed = document.getElementById(`myNameInput`);
  
  sendButton.disabled = true;
  if(nameInput.value === ``){
    sendButton.disabled = true;
  }else{
    sendButton.disabled = false;
  }
  }

  if (myNameInput === message.sender){
    return `
    <div class="mine messages>
      <div class="messages>
        ${message.text}
      </div>
      <div class="sender-info">
        ${formattedTime}
      </div>
    </div>
    `;
  } else {
    return `
        <div class="yours messages>
          <div class="message">
            ${message.text}
          </div>
          <div class="sender-info">
            ${message.sender}${formattedTime}
          </div>
        </div>
    `;
  }
}

function sendMessages(username, text) {
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

sendButton.addEventListener(`click`, function(sendButtonClickEvent){
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender, message);
  myMessage.value = ``;
});