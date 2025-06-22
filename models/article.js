import mongoose from "mongoose"

const articleSchema = mongoose.Schema({
  'title': String,
  'content': String,
  'createdAt': Date,
  
})