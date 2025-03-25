export async function POST(request: Request){
    const body = await request.json();
    console.log(body);
    return new Response(body, {
        status: 200,
        headers: { "Content-Type": "application/json" }
    })
}