import chatBotService from "./chatbotservice.js"

const chatBody = document.querySelector(".chat-body")
const txtInput = document.querySelector("#textinput")
const send = document.querySelector(".send")
const loadingEle = document.querySelector(".loading")
const chatheader = document.querySelector(".chat-header")
const container = document.querySelector(".container")

send.addEventListener("click", () => renderUserMessage());

chatheader.addEventListener("click", () =>{
    container.classList.toggle("collapse")
})

txtInput.addEventListener("keyup",(e)=>{
    if(e.key === 'Enter'){
renderUserMessage()
    }
})

const renderUserMessage = () => {
    const userInput = txtInput.value;
    renderMessageEle(userInput,'user');
    txtInput.value = ""
    toggleLoading(false)
        renderChatbotResponse(userInput)
};
const renderChatbotResponse = (userInput)=>{
    const res = getChatbotResponse(userInput)
    scrollToBottom();
}

const renderMessageEle = (txt,type)=>{
    let className = "user-message";

    const messageEle = document.createElement("div")
    const textNode = document.createTextNode(txt)

    messageEle.append(textNode)
    if(type !== 'user'){
        className = 'chatbot-message'
        messageEle.classList.add(className);
        const botResponseContainer = document.createElement("div")
        botResponseContainer.classList.add("bot-response-container")
        const botImage = document.createElement("img")
        botImage.setAttribute("src","./images/user-fill.png")
        botResponseContainer.append(botImage)
        botResponseContainer.append(messageEle)
        chatBody.append(botResponseContainer)
        }else{
            messageEle.classList.add(className);
            chatBody.append(messageEle)
        }
}

const getChatbotResponse = (userInput) =>{
     chatBotService.getChatbotResponse(userInput).
     then((response)=>{
        renderMessageEle(response)
        scrollToBottom();
        toggleLoading(true)
     })
     .catch((error)=>{
        scrollToBottom();
        toggleLoading(true)
     })
}

function scrollToBottom() {
    if(chatBody.scrollHeight >0) {
  chatBody.scrollTop = chatBody.scrollHeight;
    }
}

const toggleLoading = (show)=> loadingEle.classList.toggle("hide",show)
