const User = require('../model/User');
const Exercise = require('../model/Exercise');
const Log = require('../model/log');

const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');


router.post('/api/users', async (req, res) => {

    try {
        const usuario = await User.create(req.body);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.json({"error": "ha ocurrido un error"});
    }
});
router.get('/api/users', async (req, res) => {

    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.json({"error": "ha ocurrido un error"});
    }
});
router.post('/api/users/:id/exercises', async (req, res) => {
    try {
        let createDate = new Date();

        if (req.body.date != undefined)
            createDate = req.body.date;

        const exerciseDtoinput = {
            description: req.body.description,
            duration: req.body.duration,
            date: createDate,
            userId: req.params.id
        }
        const user = await User.findById(req.params.id);


        const exercise = await Exercise.create(exerciseDtoinput);

        const exerciseDtoOutput = {
            username: user.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString(),
            _id: user._id
        }

        res.json(exerciseDtoOutput);
    } catch (error) {
        console.log(error);
        res.json({"error": "ha ocurrido un error"});
    }
})

router.get('/api/users/:id/logs', async (req, res) => {

    try {
        let userExercises = [];
        let from = new Date("1980-01-01");
        let to = Date.now();
        if (req.query.from != undefined)
            from = req.query.from;
        if (req.query.to != undefined)
            to = req.query.to;
        console.log(from)
        console.log(to)
        /*querys*/
        if (req.query.limit != undefined)
            userExercises = await Exercise.find({
                userId: req.params.id,
                "$and": [{date: {"$gte": from}}, {date: {"$lte": to}}]
            }).limit(parseInt(req.query.limit) || -1)
        else
            userExercises = await Exercise.find({
                userId: req.params.id,
                "$and": [{date: {"$gte": from}}, {date: {"$lte": to}}]
            })


        const userinLog = await User.findById(req.params.id);
        /*output*/
        const log = [];
        userExercises.forEach(exercise => {
            log.push(new Log(exercise.description, exercise.duration, exercise.date.toDateString()));
        });
        const logDtoOutput = {
            username: userinLog.username,
            count: log.length,
            _id: userinLog._id,
            log,

        }
        res.json(logDtoOutput);
    } catch (error) {
        console.log(error);
        res.json({"error": "ha ocurrido un error"});
    }
})

module.exports = router;
