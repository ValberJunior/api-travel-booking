const mongoose = require('mongoose');
const { PLACEHOLDER_IMAGE } = require('../commons');
const TripModel= require('../models/Trips');
const { tripValidate } = require('./validate');

const tripController = {
    create: async function(req,res){
        const { error } = tripValidate(req.body);
        if(error){
            return res.status(400)
            .send(error)
        }
        const trip = new TripModel({
            city: req.body.city,
            category: req.body.category,
            image: req.body.image || PLACEHOLDER_IMAGE,
            reserve: req.body.reserve || false,
            details: req.body.details
         });
        
        try{
            const savedTrip = await trip.save();
            res.status(201).send(savedTrip);
        }catch(error){
            res.status(400).send(error)
        }
    },
    all: function(req,res){
        TripModel.find((error,data)=>{
            if(error){
                res.status(404).send(error)
            }else{
                res.send(data)
            }
        })
    },
    getForId: (req,res)=>{
        TripModel.findById((req.params.id),
        (error, data) => {
            if(error){
                res.send(404).send(error);
            }else{
                res.status(200).send(data);
            }
        }
        )
    }
}

module.exports = tripController;