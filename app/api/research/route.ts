import { RemoteGraph } from "@langchain/langgraph/remote";

const url = `http://localhost:54294`;
const graphName = "agent";
const remoteGraph = new RemoteGraph({ graphId: graphName, url });

export async function POST(req: Request, res: Response) {
    const { query } = await req.json();
    console.log(query);
    const result = await remoteGraph.invoke({
        messages: [{ content: query, type: "human" }]
    })
    const messagesReturned = result.messages;
    // const finalResponse = dummyResponse2;
    const finalResponse = messagesReturned[messagesReturned.length- 1].content;
    console.log(finalResponse)
    const data = parseJsonString(finalResponse);
    return new Response(JSON.stringify({ data: data }), { status: 200 });
}


function parseJsonString(input: string) {
    // Trim leading and trailing whitespace
    let trimmedInput = input.trim();
  
    // Remove ```json at the start if it exists
    if (trimmedInput.startsWith("```json")) {
      trimmedInput = trimmedInput.slice(7).trim();
    }
  
    // Remove trailing ``` if it exists
    if (trimmedInput.endsWith("```")) {
      trimmedInput = trimmedInput.slice(0, -3).trim();
    }
  
    try {
      // Parse the JSON string into an object
      return JSON.parse(trimmedInput);
    } catch (error) {
      console.error("Failed to parse JSON string:", error);
      throw new Error("Invalid JSON format");
    }
  }
