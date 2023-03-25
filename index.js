const OpenAI = require('./src/openai/driver');
const Github = require('./src/github/driver');

(async() => {
    var arguments = process.argv
  
    console.log(arguments[2])
    
    let openAI = new OpenAI()
    let github = new Github()
    
    let websiteHTML = await openAI.getWebsite(arguments[2])
    let deployedUrl = await github.createGithubPage(websiteHTML.text)
    
    console.log(deployedUrl)
})()
