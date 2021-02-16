let users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "wlwl" },
  { id: 4, name: "ajji" },
  { id: 5, name: "jieun" },
];

const index = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    res.status(400).end();
  } else {
    res.json(users.slice(0, limit));
  }
};

const show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.filter(user => user.id === id)[0];
  if (Number.isNaN(id)) {
    return res.status(400).end();
  } else if (!user) {
    return res.status(404).end();
  } else {
    return res.json(user);
  }
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  users = users.filter(user => user.id !== id);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  } else {
    return res.status(204).end();
  }
};

const create = (req, res) => {
  const name = req.body.name;
  const found = users.filter(user => user.name === name).length;
  if (!name) {
    return res.status(400).end();
  } else if (found) {
    return res.status(409).end();
  } else {
    const id = Date.now();
    const user = { id, name };
    users.push(user);
    return res.status(201).json(user);
  }
};

module.exports = { index, show, destroy, create };

// 각 컨트롤러의 기능만 기술되어 있다.
