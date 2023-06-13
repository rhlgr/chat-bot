const responseObj = {
    hello : " Hello! How are you doing ?",
    hey : "Hey What's Up",
    time : new Date().toLocaleTimeString()
}

const fetchResponse = (userInput) =>{
    return new Promise((res,reject)=>{
        try{
            setTimeout(() => {
                res(responseObj[userInput])
                
            }, 1000);
        } catch(error){
            reject(error)
        }
    })
}

const chatBotService = {
    getChatbotResponse(userInput){
        return fetchResponse(userInput)
    }
}

export default chatBotService;