import React from 'react'
import { useEffect } from 'react'
import { Configuration, OpenAIApi } from 'openai'



export default function OpenAI() {
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    useEffect(()=> {
        openai.createCompletion({
            model: "text-davinci-002",
            prompt: `Hi, What do you do for living?`,
            temperature: 0.5,
          }).then(data => {
            console.log(data);
          }).catch(err => {
            console.log(err);
          })
    }, [])
  return (
    <div>OpenAI</div>
  )
}
