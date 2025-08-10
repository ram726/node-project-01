const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
//get user in json
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//get user details in html page
//make code as table with column id,first_name,last_name,email,gender,job_title,
app.get("/users", (req, res) => {
  const html = `
    <h1>Users</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Job Title</th>
      </tr>
      ${users.map(user => `
        <tr>
          <td>${user.id}</td>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td>
          <td>${user.email}</td>
          <td>${user.gender}</td>
          <td>${user.job_title}</td>
        </tr>
      `).join("")}
    </ul>
  `;
  res.send(html);
});

//get user by id
//get user by id
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  return res.json(user);
});

//get user with anykeyword with first and last name, also add the total no of record found in top

app.get("/api/users/search/:keyword", (req, res) => {
  const { keyword } = req.params;
  if (!keyword) return res.status(400).send("Keyword is required");

  const results = users.filter((u) =>
    (u.first_name + " " + u.last_name).toLowerCase().includes(keyword.toLowerCase())
  );
  return res.json({ total: results.length, users: results });
});


//create a new user
//add logic to restict to save user with same email id
app.post("/api/user", (req, res) => {
  const body = req.body;
  console.log(body);
  const existingUser = users.find((u) => u.email === body.email);
  if (existingUser) {
    return res.status(400).json({ error: "User with this email already exists", user: existingUser });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "User " + body.first_name + " created successfully with id " + (users.length) });
  });
});



// Update a user with id and return a success message
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.email = req.body.email;
  user.gender = req.body.gender;
  user.job_title = req.body.job_title;

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).send("Error updating user");
    return res.json({ message: "User updated successfully", user });
  });
});


// Delete a user with id and return a success message
app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");

  users.splice(userIndex, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).send("Error deleting user");
    return res.json({ message: "User deleted successfully" });
  });
});

//delete duplicate records with same firstname,lastname and emailid
app.delete("/api/delete/duplicateUsers", (req, res) => {
  const uniqueUsers = [];
  const emailMap = new Map();

  users.forEach((user) => {
    const key = `${user.first_name}-${user.last_name}-${user.email}`;
    if (!emailMap.has(key)) {
      emailMap.set(key, true);
      uniqueUsers.push(user);
    }
  });

  if (uniqueUsers.length === users.length) {
    return res.status(200).json({ message: "No duplicate records found" });
  }

  users.length = 0;
  users.push(...uniqueUsers);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).send("Error deleting duplicates");
    return res.status(200).json({ message: "Duplicate records deleted successfully" });
  });
});

//update a user with id and return a success message
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.email = req.body.email;
  user.gender = req.body.gender;
  user.job_title = req.body.job_title;
  return res.json({ message: "User updated successfully", user });
});

//delete  a user with id and retrun a sucessfull message
app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");

  users.splice(userIndex, 1);
  return res.status(204).send({ message: "User deleted successfully" });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});