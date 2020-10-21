//connection string of mongoose
const mongoose = require('mongoose')
const mentorModel = require('../models/mentormodel')
require('dotenv').config()
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`


mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(result =>{
    console.log('connected to DB')})
.then(result=> {
    mentorModel.insertMany(
        [
            {firstname: "Mentor", lastname: "McMentor", img:"/mentors/michael-dam-mEZ3PoFGs_k-unsplash.jpg", userid:"mentoree", email:"mentor@mentoray.com", slug: "mentor-mentoree", designation: "Senior UX Designer", company: "Mentoray", industry: "UIUX", interests:["UI", "Design", "Research"], yearsOfExperience: 6, 
            intention: ["One-on-one mentoring", "Long-term career guidance", "Discussion of social issues", "Interview tips", "Informational interviews"],
            description: "I’m a Senior UX Designer and I love my job—but I didn’t always know what direction I wanted to take in my career. I started out in communications. After a lot of trial and error, I found UI/UX. I want to give back by sharing my experiences, painful mistakes etc. with those starting out a new career"
              },
        
            {firstname: "Timothee", lastname: "Chalamet", img:"/mentors/midas-hofstra-a6PMA5JEmWE-unsplash.jpg", userid:"funboy", email:"timothee.chamlamet@outlook.com", slug:"timothee-funboy", designation: "UI Engineer", company: "Google", industry: "UIUX", interests:["UI", "Software development"], yearsOfExperience: 3, 
            intention: ["One-on-one mentoring", "Interview tips", "Building your resume"],
            description: "I'm a UI Engineer at Google. I love meeting new friends, discuss ideas and share my personal journey on how I got to where I am today in my career. Hit me up if you are curious to know more."
            },
        
            {firstname: "Roberto", lastname: "Pirelli", img:"/mentors/rafael-silva-yA2NU-Z00aY-unsplash.jpg", userid:"italianboy", email:"roberto.pirelli@outlook.com", slug:"roberto-italianboy", designation: "UIUX Desginer", company: "Artsy", industry: "UIUX", interests:["UI", "Design", "Front-end"], yearsOfExperience: 5, 
            intention: ["Mentoring"],
            description: "Few years ago, I was working at a fast-food chain flippin burgers and was in a band with my brothers and his friends. I took up graphic design to design the marketing resources for our band. Eventually, I dabbled in coding and soon, the rest is history. Check out my youtube channel - UIRoberto"
            },
        
            {firstname: "Alfian", lastname: "Dimas", img:"/mentors/alfian-dimas-D9AhQioeVqM-unsplash.jpg", userid:"Dimas88", email:"alfian.dimas@outlook.com", slug:"alfian-dimas88", designation: "UX Lead", company: "Twitter", industry: "UIUX", interests:["UX"], yearsOfExperience: 5, 
            intention: ["Networking skills", "Interview tips"],
            description: "Obtained my bachelor degree in psychology in Stanford University, before working in Silicon Valley for a year, and currently building a career in design consulting in sunny Singapore."
            },
        
            {firstname: "Helen", lastname: "Ngyuen", img:"/mentors/peter-nguyen-n9LOXO_-alo-unsplash.jpg", userid:"hnn87", email:"helen.ngyuen@outlook.com", slug:"helen-hnn87", designation: "Front-end engineer", company: "Facebook", industry: "UIUX", interests:["UI", "Front-end"], yearsOfExperience: 8, 
            intention: ["Networking skills", "Interview tips"],
            description: "Passionte about user research/ user interface, data science and automation"
            },
        
        ]

    )
    .then(insertresult=>{
        console.log('data inserted into database')
    })
    .catch(err=> {console.log(err)})
    .finally(()=>{mongoose.disconnect()})
})    


.catch(err=> {
    console.log('connectiion error')
    console.log(err)})
