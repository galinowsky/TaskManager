
const taskName = 'inprompt'
const key = "b5fc8196-3bf4-41f3-b17e-350c6c67a205";
const openAIKey = "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";
const moderationUrl = "https://api.openai.com/v1/moderations";
const tokenUrl = `https://zadania.aidevs.pl/token/${taskName}`;
const answerUrl = "https://zadania.aidevs.pl/answer/";

const postData = async () => {
    const payload = { apikey: key };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
  
    try {
      const response = await fetch(tokenUrl, options);
      const { token } = await response.json();
      return token;
    } catch (error) {
      console.error(error);
    }
  };
  
  const postSolution = async (solution, token) => {
    const url = `${answerUrl}${token}`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: solution }),
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getData = async (token) => {
    const url = `https://zadania.aidevs.pl/task/${token}`;
    const options = { method: "GET" };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
    //   console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const formatAnswer = (results) => results.map((result) => (result.flagged ? 1 : 0));
  const testModeration = async (input) => {
    const model = "content-filter-alpha-1";
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAIKey}`,
      },
      body: JSON.stringify({ input }),
    };
  
    try {
      const response = await fetch(moderationUrl, options);
      const { results } = await response.json();
      return results
    } catch (error) {
      console.error(error);
    }
  };

export { postData, getData, testModeration, formatAnswer, postSolution };