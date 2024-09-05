const Groq =require("groq-sdk");
require('dotenv').config()
const groq = new Groq({ apiKey: process.env.apiKey});
async function getAnswerFromGPT(prompt, data) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `${prompt}\n\n${data}`,
                },
            ],
            model: "llama3-8b-8192",
            temperature: 0.2,
            max_tokens: 150,
            top_p: 0.8,
            stream: true, // Stream is enabled
            stop: null,
        });

        // console.log("API Response:", completion);

        let answer = "";

        // Using the async iterator to read streamed data
        for await (const chunk of completion) {
            const messageContent = chunk.choices?.[0]?.delta?.content || "";
            if (messageContent) {
                answer += messageContent;
            }
        }

        // Final answer concatenated from the chunks
        if (answer) {
            // console.log("Final Answer:", answer);
            return answer;
        } else {
            console.error("Unexpected API response:", completion);
            return "No valid response received";
        }
    } catch (error) {
        console.error("Error calling Groq API:", error);
        return "An error occurred while processing your request";
    }
}

module.exports = getAnswerFromGPT;