const express = require("express")
const app = express()
const port = 80
const path = require("path");
const fs = require('fs');
const marked = require('marked');
const matter = require('gray-matter');

app.set("view engine", "ejs");
app.use("/assets",express.static("assets"))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/privacy", (req, res) => {
    res.render("privacy.ejs");
});

app.get("/experience", (req, res) => {
    res.render("experience.ejs");
});

app.get("/garden", (req, res) => {
    res.render("garden.ejs");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get('/post/:name', (req, res) => {
  const postPath = path.join(__dirname, 'posts', `${req.params.name}.md`);
  fs.readFile(postPath, 'utf8', (err, content) => {
    if (err) return res.status(404).sendFile(path.join(__dirname, "views/404.html"));
    
    const parsed = matter(content); 
    const htmlContent = marked.parse(parsed.content);

    res.render('post', { description: parsed.data.description, author: parsed.data.author, date: parsed.data.date, title: parsed.data.title, content: htmlContent });
  });
});

app.get('/posts', (req, res) => {
  const postsDir = path.join(__dirname, 'posts');

  fs.readdir(postsDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading posts directory');
    }

    const posts = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const fullPath = path.join(postsDir, file);
        const content = fs.readFileSync(fullPath, 'utf8');
        const parsed = matter(content);

        return {
          title: parsed.data.title || file.replace('.md', ''),
          description: parsed.data.description || '',
          date: parsed.data.date || 'Unknown',
          author: parsed.data.author || 'Unknown',
          filename: file,
          slug: file.replace('.md', '')
        };
      });

    res.render('posts', { posts });
  });
});


app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})