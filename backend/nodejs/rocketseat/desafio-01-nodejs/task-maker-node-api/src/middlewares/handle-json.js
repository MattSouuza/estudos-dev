export const handleJson = async (req, res) => {
    const buffers = [];

    
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    console.log(buffers);

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        console.log("catch");
        req.body = null;
    }

    res.setHeader("Content-type", "application/json");
} 