require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 5005;

const pool = require("./db/dbConfig");
const cors = require('cors');
app.use(cors());

app.use(express.json());

//testing
app.get("/api/test", (req, res) => {
    res.json({msg: "testing"})
})

//get all surveys
app.get('/api/surveys', async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM surveys");
        res.status(200).json({
            status: "success",
            data: {
                length: result.rows.length,
                surveys: result.rows
            }
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//get survey with id
app.get('/api/surveys/:id', async (req, res) => {
    const surveyId = req.params.id;
    try{
        const result = await pool.query("SELECT * FROM surveys WHERE id = $1", [surveyId]);
        res.status(200).json({
            status: "success", 
            data: {
                survey: result.rows[0]
            }
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//add survey
app.post('/api/surveys', async(req, res) => {
    const {title, description} = req.body
    try{
        const result = await pool.query("INSERT INTO surveys (title, description) values ($1, $2) returning *", [title, description]);
        res.status(200).json({
            status: "success",
            data: {
                survey: result.rows[0]
            }
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err,
            body: req.body
        })
    }
});

//update survey
app.put('/api/surveys/:id', async(req, res) =>{
    const surveyId = req.params.id;
    const {title, description} = req.body;
    try{
        const result = await pool.query("UPDATE surveys SET title = $1, description = $2 where id = $3 returning *", [title, description, surveyId])
        res.status(200).json({
        status: "success", 
        data: {
            survey: result.rows[0]
        }
    })}catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//delete survey
app.delete('/api/surveys/:id', async (req, res) =>{
    const surveyId = req.params.id;
    try{
        const result = await pool.query("DELETE FROM surveys WHERE id = $1", [surveyId])
        res.status(200).json({
            status: "success",
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//get all questions
app.get('/api/surveys/questions', async (req, res)=>{
    try{
        const result = await pool.query("SELECT * FROM questions")
        res.status(200).json({
            status: "success",
            questions: result.rows
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//get all questions in a survey
app.get('/api/surveys/:id/questions', async (req, res)=>{
    const surveyId = req.params.id;
    try{
        const result = await pool.query("SELECT * FROM questions WHERE survey_id = $1", [surveyId])
        res.status(200).json({
            status: "success",
            questions: result.rows
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//get one question in a survey
app.get('/api/surveys/:id/questions/:qId', async(req, res) => {
    const surveyId = req.params.id;
    const qId = req.params.qId;
    try{
        const result = await pool.query("SELECT * FROM questions WHERE survey_id = $1, id = $2", [surveyId, qId]);
        res.status(200).json({
            status: "success",
            question: result.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//add questions
app.post('/api/surveys/:id/questions', async (req, res) => {
    const surveyId = req.params.id;
    const {question, type, options} = req.body;
    try{
        const result = await pool.query("INSERT INTO questions (survey_id, question, type, options) VALUES ($1, $2, $3, $4) returning *", [surveyId, question, type, options]);
        res.status(200).json({
            status: "success",
            question: result.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//update question
app.put('/api/surveys/:id/questions/:qId', async (req, res) => {
    const surveyId = req.params.id;
    const qId = req.params.qId
    const {question, type, options} = req.body;
    try{
        const result = await pool.query("UPDATE questions SET question = $1, type = $2, options = $3 WHERE survey_id = $4 AND id = $5 returning *", [question, type, options, surveyId, qId])
        res.status(200).json({
            status: "success",
            question: result.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//delete all question of a survey
app.delete('/api/surveys/:id/questions', async (req, res) => {
    const surveyId = req.params.id;
    try{
        const result = await pool.query("DELETE FROM questions WHERE survey_id = $1", [surveyId])
        res.status(200).json({
            status:"success"
        })
    }catch(err) {
        res.status(400).json({
            status: "error",
            error: err
        })
    }
}) 

//delete question with specific id
app.delete('/api/surveys/:id/questions/:qId', async (req, res) => {
    const surveyId = req.params.id;
    const qId = req.params.qId;
    try{
        const result = await pool.query("DELETE FROM questions WHERE survey_id = $1 AND id = $2", [surveyId, qId])
        res.status(200).json({
            status: "success"
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
});

//Get all answers of a survey
app.get('/api/surveys/:id/answers', async (req, res) => {
    const surveyId = req.params.id;
    try{
        const result = await pool.query("SELECT * FROM answers WHERE survey_id = $1", [surveyId]);
        res.status(200).json({
            status: "success",
            length: result.rows.length,
            answers: result.rows
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
})

//Get all answers of a survey with specific question id
app.get('/api/surveys/:id/answers/:qId', async (req, res) => {
    const surveyId = req.params.id;
    const questionId  =req.params.qId
    try{
        const result = await pool.query("SELECT * FROM answers WHERE survey_id = $1 AND question_id = $2", [surveyId, questionId]);
        res.status(200).json({
            status: "success",
            length: result.rows.length,
            answers: result.rows
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            error: err
        })
    }
})

//Add answers
app.post('/api/surveys/:id/answers', async (req, res) => {
    const survey_id = req.params.id;
    const {question_id, type, answer} = req.body;
    try{
        const result = await pool.query("INSERT INTO answers (survey_id, question_id, type, answer) VALUES ($1, $2, $3, $4) returning *", [survey_id, question_id, type, answer]);
        res.status(200).json({
            status: "success",
            answer: result.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status: "error", 
            error: err
        })
    }
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});