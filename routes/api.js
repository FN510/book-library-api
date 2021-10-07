/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

let mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.mongo_uri}@cluster0.csliv.mongodb.net/fcc?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => console.log(error));

let Book = require('../models/Book.js');

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
        if (err) { console.log(err) } 
        else {
          res.send(foundBook);
        }
      })

    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
