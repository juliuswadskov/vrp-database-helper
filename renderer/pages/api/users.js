import { createConnection } from '@casper124578/mysql.ts'

export default async function handler(req, res) {
    if (req.method == "GET") {
        const database = "vrpfx"
        const user = "root"
    
        const db = await createConnection({ database, user }); 
        const results = await db.query().select(["*"]).from("vrp_users").exec();
        res.json(results)
    }
}