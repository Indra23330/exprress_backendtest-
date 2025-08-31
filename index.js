 import express from "express";
import 'dotenv/config';
 const app = express();
 const port = process.env.PORT || 3000;

app.use(express.json());

let user = [];
let nextId = 1;
 
 app.get("/", (req, res) => {
   res.send("Hello World!");
 });

  app.post("/login", (req, res) => {
    const {Email, Password} = req.body;
    const newUser = {id: nextId++, Email, Password};
    user.push(newUser);
    res.status(201).send(newUser);
 });

 app.get("/login", (req, res) => {
   res.status(200).send(user);
 });

 app.get("/login/:id", (req, res) => {
    const users = user.find(u => u.id === parseInt(req.params.id));
    if(!users){
        throw new Error("User not found");
    }
   res.status(200).send(users);
 });


 app.put("/login/:id", (req, res) => {
   const { Email, Password } = req.body;
   const users = user.find(u => u.id === parseInt(req.params.id));
   if (!users) {
       throw new Error("User not found");
   }
  users.Email = Email;
  users.Password = Password;
   res.status(200).send(users);
 });

 app.delete("/login/:id", (req, res) => {
   const userIndex = user.findIndex(u => u.id === parseInt(req.params.id));
   if (!userIndex) {
       throw new Error("User not found");
   }
   user.splice(userIndex, 1);
   res.status(204).send();
 });

 app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
 });
