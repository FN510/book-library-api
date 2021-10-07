/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const e = require('express');
let mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.mongo_uri}@cluster0.csliv.mongodb.net/fcc?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => console.log(error));

let Book = require('../models/Book.js');
let Comment = require('../models/Comment.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find((err, books) => {
        if (err) { console.log(err) }
        else {
          res.send(books);
        }
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      if (!title) {
        res.send('missing required field title');
      } else {
        //response will contain new book object including atleast _id and title
        let newBook = new Book({
          title: title,
        });

        newBook.save((err, savedBook) => {
          if (err) { console.log(err) }
          else if (savedBook) {
            console.log('new book - ' + title);
            res.send(savedBook)
          }
        })

          
        }

    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(bookid, (err, foundBook)=> {
        if (err) {
          console.log(err);
          res.send('no book exists');
        } 
        else if (foundBook){
          res.send(foundBook);
        } else {
          res.send('no book exists');
        }
      })

    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        res.send('missing required field comment');
      } else {
        Book.findById(bookid, (err, foundBook)=> {
          if (err) {
            console.log(err);
            res.send('no book exists');
          } 
          else if (foundBook){
            //res.send(foundBook);
            let newComment = new Comment({bookid: bookid, text: comment});
            newComment.save();
            foundBook.commentcount +=1;
            foundBook.save((err, book)=> {
              if (err) {
                console.log(err);
                res.send('Problem saving book after comment')
              }
              else if (book) {
                res.send(book)
              }
            })
          } else {
            res.send('no book exists');
          }
        })
      }
      //json res format same as .get
      // find related book
      
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
