const express = require('express')
const hbs =require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')


app.use((req, res, next) => {
    let now = new Date().toString()
    let log= `${now}: ${req.method}: ${req.url}`
    console.log(log)
    fs.appendFile('server.log',log +'\n', (err) => {
        if (err){
            console.log('Unable to append to server.log.')
        }
    })
    next()
})

// app.use((req,res,next)=> {
//     res.render('maintenance.hbs', {
//         currentTitle: 'Maintenance',
//         welcomeMessage: 'We will be right back',
       
//     })
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        currentTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page',
        description: `This is just a test project using node.js as server language `
       
    })
    
})

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        currentTitle: 'About Page',
       
    })
})
app.get('/projects', (req, res) =>{
    res.render('projects.hbs', {
        currentTitle: 'Projects',
        welcomeMessage: 'Welcome to the portfolio page'
       
    })
})
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: {
            type: 'error',
            message: 'OOPS Something went wrong'
        } 
        
    })
})
app.listen(port, () => {
    console.log(`Server is upp and running on port ${port}`)
})