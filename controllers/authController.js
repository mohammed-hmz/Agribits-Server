const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM admins WHERE Email = ?', [email], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = results[0];
    // const  hashedPassword= await bcrypt.hash("moh2004", 10);
    // console.log(hashedPassword)
    bcrypt.compare(password, user.owner_Password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // Create a JWT token
      const token = jwt.sign({ id: user.AdminID }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Set token in a cookie
  		res.status(200).send({ data: token, message: "logged in successfully" });

  });

  });
};
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
exports.protectedRoute = (req, res) => {
  res.json({ message: "You are authorized to access this protected route!" });
};
exports.feedbackRoutes=(req,res)=> {  
  db.query('SELECT * FROM feedback', (err, results) => {
  if (err) {
      return res.status(500).send('Error fetching feedback');
  }
  res.json(results);
});}

exports.feedbackInsert=(req, res) => {
  const { name, feedback } = req.body;

  const query = 'INSERT INTO feedback (user, description) VALUES (?, ?)';
  db.query(query, [name, feedback], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to submit feedback' });
    }
    res.send({ message: 'Feedback submitted successfully' });
  }); 
}