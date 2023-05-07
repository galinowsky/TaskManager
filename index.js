const key = "b5fc8196-3bf4-41f3-b17e-350c6c67a205";
const openAIKey = "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";
const moderationUrl = "https://api.openai.com/v1/moderations";
const tokenUrl = "https://zadania.aidevs.pl/token/blogger";
const answerUrl = "https://zadania.aidevs.pl/answer/";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: openAIKey,
});
const openai = new OpenAIApi(configuration);

const askGPT = async (prompt) => {
  // const completion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt,
  // });
let data = ''
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIKey}`

      },
      body: JSON.stringify({
        "model": "gpt-4",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
      })
    });
    
    data = await response.json();
   console.log(data)
    
  } catch (error) {
    console.error(error);
  }

  console.log(data);
  return data.choices[0].message.content;
};


import {
  postData,
  getData,
  testModeration,
  formatAnswer,
  postSolution,
} from "./helpers.js";

const findPersonData = (database, personName) => {
  const nameInfoIndex = database.findIndex(
    (personInfo) => personInfo.split(" ")[0] === personName
  );
  const nameInfo = database[nameInfoIndex];
  return nameInfo;
};
const getPersonName = (person) => {
  return person.split(" ").reverse()[0].slice(0, -1);
};
const main = async () => {
  const taskToken = await postData();
  const taskData = await getData(taskToken);
  const { input, question } = taskData;
  const personName = getPersonName(question);
  const personData = findPersonData(input, personName);
  console.log({ personData, question });
const prompt = `this is person data: ${personData}
    answer me this question ${question}`;
const messages = [{"role": "user", "content": "Say this is a test!"}]
    const answer = await askGPT(prompt)
    console.log(answer)
  //   const moderationResult = await testModeration(input);
  //   const formatedAnswer = formatAnswer(moderationResult);
  //   console.log(formatedAnswer);

    await postSolution(answer, taskToken);
};

main();
