require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')

class Driver {
    constructor() {
        this.key = process.env.OPENAI_API_KEY
        this.configuration = new Configuration({
            apiKey: this.key
        })
        this.driver = new OpenAIApi(this.configuration);
    }

    async getWebsite(query) {
        const response = await this.driver.createCompletion({
          model: "text-davinci-003",
          prompt: `Create HTML code of a website about ${query}`,
          temperature: 0,
          max_tokens: 4000,
          top_p: 1,
          frequency_penalty: 0.2,
          presence_penalty: 0
        });

        return response.data.choices[0]
    }
}

module.exports = Driver