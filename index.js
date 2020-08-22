const core = require('@actions/core');
const axios = require('axios');
const moment = require('moment');

(async () => {
    if(process.env.SLACK_DEPLOYMENT_HOOK) {
        const request = {
            url: 'https://hooks.slack.com/services/'+process.env.SLACK_DEPLOYMENT_HOOK, 
            method: 'POST',
            data: { text: `*New deployment* :rocket:\n
                *App:* ${process.env.REPOSITORY}
                *Branch:* master
                *Commit:* ${process.env.SHA}
                *Environment:* ${process.env.APP_ENV}
                *Date:* ${moment().format('DD/MM/YYYY HH:mm:ss')}
                *Actor:* ${process.env.ACTOR}`},
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            await axios(request)
            core.setOutput('Slack message sent')
        } catch (error) {
            core.setFailed(error.response.data);
        }
    } else {
        core.setOutput('Missing: SLACK_DEPLOYMENT_HOOK')
    }

})()