import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    category : {
        type : String,
    },
    price : {
        type : String,
    },
    discountPrice : {
        type : String,
    },
    stock : {
        type : number,
    },
    orderType : {
        type : String,
    },
    shortDiscription : {
        type : String,
    },
    longDiscription : {
        type : String,
    },
    variant : {
        type : String,
    },
    images : [
        {

        }
    ]
})