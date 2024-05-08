import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "langchain/schema/output_parser";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { Document } from "langchain/document";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ApiKey = process.env.OPENAI_API_KEY;

export const runtime = 'edge';

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
  ["system", "You are a world class Programmer And Devops Engineer."],
  ["user", "{input}"],
]);

export async function GET(request: Request) {
  const model = new ChatOpenAI({
    openAIApiKey: ApiKey,
  });
  const embeddings = new OpenAIEmbeddings();
  const loader = new CheerioWebBaseLoader(
    "https://js.langchain.com/docs/get_started/introduction/"
  );

  const docs = await loader.load();

  console.log(docs.length);
  console.log(docs[0].pageContent.length);

  const splitter = new RecursiveCharacterTextSplitter();
  const splitDocs = await splitter.splitDocuments(docs);

  console.log(splitDocs.length);
  console.log(splitDocs[0].pageContent.length);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const documentChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });

  await documentChain.invoke({
    input: "What is Langchain tell me about all feature how to setup",
    // context: [
    //   new Document({
    //     pageContent:
    //       "LangSmith is a platform for building production-grade LLM applications.",
    //   }),
    // ],
  });

  const retriever = vectorstore.asRetriever();

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const msg = await retrievalChain.invoke({
    input: "What is Langchain tell me about all feature how to setup",
  });

  // const chain = prompt.pipe(model).pipe(new StringOutputParser());

  // const msg = await chain.invoke({
  //   input: "What is Langchain tell me about all feature how to setup",
  // });

  return NextResponse.json(msg);
}
