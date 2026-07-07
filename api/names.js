export default function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Example: log or store the name
    console.log("Received name:", name);

    // Respond back to client
    return res.status(200).json({
      success: true,
      message: `Name '${name}' stored successfully!`
    });
  }

  // Handle other methods if needed
  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}
