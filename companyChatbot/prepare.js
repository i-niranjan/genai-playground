import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function indexTheDocument(filePath) {
  const loader = new PDFLoader(filePath, {
    splitPages: false,
  });
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });
  const doc = await loader.load();
  const allText = doc.map((d) => d.pageContent).join("\n");
  const chunks = await textSplitter.splitText(allText);
  console.log(chunks);
}
