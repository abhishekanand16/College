const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();

        const db = client.db("studentDB");
        const students = db.collection("students");

        // 1. Insert minimum 5 student records
        await students.insertMany([
            { name: "Rahul", usn: "101", marks: 85 },
            { name: "Priya", usn: "102", marks: 90 },
            { name: "Arjun", usn: "103", marks: 78 },
            { name: "Sneha", usn: "104", marks: 88 },
            { name: "Kiran", usn: "105", marks: 92 }
        ]);

        console.log("5 student records inserted.");

        // 2. Fetch all student records
        console.log("\nAll Student Records:");
        const result = await students.find().toArray();
        console.log(result);

        // 3. Update student marks
        await students.updateOne(
            { usn: "103" },
            { $set: { marks: 85 } }
        );

        console.log("\nStudent marks updated.");

        // 4. Delete a student record
        await students.deleteOne({ usn: "105" });

        console.log("Student record deleted.");

        // Display final records
        console.log("\nFinal Student Records:");
        console.log(await students.find().toArray());

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

main();