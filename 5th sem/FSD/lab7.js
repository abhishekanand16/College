const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let tasks;

// Connect to MongoDB and start server
async function main() {
    try {
        await client.connect();

        const db = client.db("taskDB");
        tasks = db.collection("tasks");

        console.log("MongoDB connected successfully.");

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// 1. CREATE a task
app.post("/tasks", async (req, res) => {
    try {
        const task = {
            title: req.body.title,
            description: req.body.description,
            completed: false
        };

        const result = await tasks.insertOne(task);

        res.status(201).json({
            message: "Task created successfully",
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. READ all tasks
app.get("/tasks", async (req, res) => {
    try {
        const result = await tasks.find().toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. READ a single task
app.get("/tasks/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const result = await tasks.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!result) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. UPDATE a task
app.put("/tasks/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const result = await tasks.updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    completed: req.body.completed
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. DELETE a task
app.delete("/tasks/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const result = await tasks.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

main();
