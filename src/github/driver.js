require('dotenv').config()

const { Octokit } = require('octokit')
const moment = require('moment')

class Driver {
    constructor() {
        this.key = process.env.GITHUB_API_KEY
        this.owner = process.env.OWNER
        this.octokit = new Octokit({
            auth: this.key
        })
    }
    
    async createGithubPage(htmlToInject) {
        // Create a repository first in github
        let repoName = moment().format("YYYYMMDDhhmmss_")+this.owner
        let createRepoResponse = this._createRepository(repoName, htmlToInject)

        return createRepoResponse
        // Create a gh-pages branch in github
        // Commit the htmlToInject variable in github
    }

    async _createRepository(name, html) {
        let response = await this.octokit.request('POST /user/repos', {
            name,
            description: 'This is Dwayne bot randomly spawning a ChatGPT generated repo',
            homepage: 'https://github.com',
            'private': false,
            is_template: false,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        if (response.status) {
            // create the branch
            response = await this._createGHPage(name, html)

            return response
        }
        return false
    }

    async _createGHPage(repoName, html) {
        try {
            let base64HTML = Buffer.from(html).toString('base64')
            let response = await this.octokit.request(`PUT /repos/{owner}/{repo}/contents/{path}`, {
                owner: this.owner,
                repo: repoName,
                path: 'index.html',
                message: 'commit message',
                committer: {
                    name: "Dwayne Tin",
                    email: 'octacat@github.com'
                },
                content: base64HTML,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            if (response) {
                let tree = response.data.commit.tree.sha
                response = await this.octokit.request(`POST /repos/{owner}/{repo}/git/commits`, {
                    owner: this.owner,
                    repo: repoName,
                    message: 'Initial Commit',
                    tree,
                    headers: {
                      'X-GitHub-Api-Version': '2022-11-28'
                    }
                })

                let sha = response.data.sha

                response = await this.octokit.request(`POST /repos/{owner}/{repo}/git/refs`, {
                    owner: this.owner,
                    repo: repoName,
                    ref: 'refs/heads/gh-pages',
                    sha,
                    headers: {
                      'X-GitHub-Api-Version': '2022-11-28'
                    }
                  })

                console.log(response)
            }

            return `${this.owner}.github.io/${repoName}`
        } catch (e) {
            console.log(e.message)
        }
    }
}

module.exports = Driver