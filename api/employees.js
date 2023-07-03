const router = require("express").Router();
const { Client } = require("pg");

const dbClient = new Client({
    password: "root",
    user: "root",
    host: "postgres",
});

dbClient.connect();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const queryTemplate = "SELECT * FROM employees WHERE id = $1";

    const results = await dbClient
        .query(queryTemplate, [id])
        .then((payload) => {
            return payload.rows;
        })
        .catch((err) => {
            res.status(400).send(err);
        });

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
});

router.get("/", async (req, res) => {
    const results = await dbClient
        .query("SELECT * FROM employees")
        .then((payload) => {
            return payload.rows;
        })
        .catch((err) => {
            res.status(400).send(err);
        });

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
});

router.post("/", async (req, res) => {
    const employee = req.body;
    const queryTemplate = "INSERT INTO employees(name, title, avatar) VALUES ($1, $2, $3)";

    const results = await dbClient
        .query(queryTemplate, [employee.name, employee.title, employee.avatar])
        .then((payload) => {
            return payload.rows[0];
        })
        .catch((err) => {
            res.status(400).send(err);
        });

    res.setHeader("Content-Type", "application/json");
    res.status(201);
    res.send(JSON.stringify(results));
});

router.update("/:id", async (req, res) => {
    const id = req.params.id;
    const employee = req.body;
    const queryTemplate = "UPDATE employees SET (name, title, avatar)  = ($2, $3, $4) WHERE id = $1";

    await dbClient
        .query(queryTemplate, [id, employee.name, employee.title, employee.avatar])
        .then((payload) => {
            if (payload.rowCount == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const queryTemplate = "DELETE FROM employees WHERE id = $1";

    await dbClient
        .query(queryTemplate, [id])
        .then((payload) => {
            if (payload.rowCount == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

module.exports = router;