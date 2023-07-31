const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const dbClient = new Client({
    password: "root",
    user: "root",
    host: "postgres",
});

dbClient.connect();

router.use(express.urlencoded({ extended: false }));

async function searchWithParameters(req, res, inactiveOnly) {
    const terms = "%" + req.params.terms + "%";
    let queryTemplate = "SELECT * FROM employees WHERE (active AND name LIKE $1)";
    if (inactiveOnly) {
        queryTemplate = "SELECT * FROM employees WHERE (NOT active AND name LIKE $1)";
    }

    const results = await dbClient
        .query(queryTemplate, [terms])
        .then((payload) => {
            return payload.rows;
        })
        .catch((err) => {
            res.status(400).send(err);
        });

    if (results.rowCount == 0) {
        res.sendStatus(404);
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
}

router.get("/search/:terms", async (req, res) => {
    await searchWithParameters(req, res, false);
});

router.get("/disabled/search/:terms", async (req, res) => {
    await searchWithParameters(req, res, true);
});

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

    if (results.rowCount == 0) {
        res.sendStatus(404);
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
});

async function getAll(req, res, inactiveOnly) {
    let queryTemplate = "SELECT * FROM employees WHERE active";
    if (inactiveOnly) {
        queryTemplate = "SELECT * FROM employees WHERE NOT active";
    }

    const results = await dbClient
        .query(queryTemplate)
        .then((payload) => {
            return payload.rows;
        })
        .catch((err) => {
            res.status(400).send(err);
        });

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
}

router.get("/disabled", async (req, res) => {
    await getAll(req, res, true);
});

router.get("/", async (req, res) => {
    await getAll(req, res, false);
});

router.post("/", async (req, res) => {
    const employee = req.body;
    const queryTemplate = "INSERT INTO employees(name, title, avatar) VALUES ($1, $2, $3)";

    if (employee.avatar == "") {
        employee.avatar = "https://api.dicebear.com/6.x/bottts/svg?seed=" + encodeURIComponent(employee.name);
    }

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

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const employee = req.body;
    const queryTemplate = "UPDATE employees SET (name, title, avatar) = ($2, $3, $4) WHERE id = $1";

    if (employee.avatar == "") {
        employee.avatar = "https://api.dicebear.com/6.x/bottts/svg?seed=" + encodeURIComponent(employee.name);
    }

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
    const queryTemplate = "UPDATE employees SET active = FALSE WHERE id = $1";

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