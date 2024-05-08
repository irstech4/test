import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ApiKey = process.env.OPENAI_API_KEY;

export const runtime = 'edge';

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a world class Programmer."],
  ["user", "{input}"],
]);


export async function GET(request: Request) {

  const model = new ChatOpenAI({
    openAIApiKey: ApiKey,
  });



  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  const msg = await chain.invoke({
    input: "explain z or zod with example",
  });



  return NextResponse.json(msg);
}
