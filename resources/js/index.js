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

function fetchMessages(){
  return fetch(serverURL)
    .then(response => response.json());
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