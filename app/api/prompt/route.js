import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"



export const GET = async(req, res) => {
    try {
        await connectToDB()
        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), {status : 200})
    } catch (error) {
        return new Response("Unable to fetch data", {status : 500})
    }
}