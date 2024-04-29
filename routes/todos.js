const express = require("express");
const router = express.Router();
const jsonfile = require("jsonfile");
const path = "./todos.json";

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  jsonfile
    .readFile(path)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/", (req, res) => {
  const newTodo = req.body;
  const currentData = jsonfile.readFileSync(path);

  currentData.push(newTodo);

  jsonfile
    .writeFile(path, currentData)
    .then((res) => {
      res.send("OK");
    })
    .catch((err) => {
      res.send(err);
    });
});

router
  .route("/:id")
  .get((req, res) => {
    jsonfile
      .readFile(path)
      .then((data) => {
        const todoItem = data.find((item) => item.id == req.params.id);
        res.send(todoItem);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put((req, res) => {
    const currentData = jsonfile.readFileSync(path);
    const todoIndex = currentData.findIndex((item) => item.id == req.params.id);
    currentData[todoIndex] = req.body;

    jsonfile
      .writeFile(path, currentData)
      .then((res) => {
        res.send(`Updated ${req.params.id}`);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .delete((req, res) => {
    const currentData = jsonfile.readFileSync(path);

    const processedData = currentData.filter(
      (item) => item.id != req.params.id
    );

    jsonfile
      .writeFile(path, processedData)
      .then((res) => {
        res.send(`Deleted ${req.params.id}`);
      })
      .catch((err) => {
        res.send(err);
      });
  });

module.exports = router;
