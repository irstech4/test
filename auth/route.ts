import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ApiKey = process.env.OPENAI_API_KEY;

console.log(ApiKey);

// export async function GET(request: NextRequest, response: NextResponse) {
//   const { searchParams } = new URL(request.url)
//   const id = searchParams.get('id')
//   console.log(id)
//   const cookiesStore = cookies()
//   const token = cookiesStore.get('token')

//   const greeting = "Hello World!!";
//   const json = {
//     greeting,
//   };

//   return NextResponse.json(json, {
//     status:200,
//     headers: {
//       'Set-Cookie': `token=${token?.value}`
//     }
//   });
// }

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a world class technical documentation writer."],
  ["user", "{input}"],
]);

export async function GET(request: Request) {
  const outputParser = new StringOutputParser();
  const model = new ChatOpenAI({
    openAIApiKey: ApiKey,
  });

  const chain = prompt.pipe(model).pipe(outputParser);

  const msg = await chain.invoke({
    input: "What is Server",
  });

  const msg1 = {
    hello: "What is Server",
  };

  return NextResponse.json(msg1);
}
