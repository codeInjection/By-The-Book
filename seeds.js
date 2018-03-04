var mongoose = require("mongoose");
var Author = require("./models/authorSchema");
var Book = require("./models/bookSchema");
//add few places in an array
var bookData = [
    {
        ISBN13: "9781593275846",
        title: "Eloquent JavaScript, Second Edition",
        author: 1,
        publish_date: "2014-12-14T00:00:00.000Z",
        publisher: "No Starch Press",
        pages: 472,
        quantity: 10,
        description:
            "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
        price: 500,
        website: "http://eloquentjavascript.net/",
        genre: ["Programming", "Javascript", "Computer Science"],
        book_img: "/images/book1",
        rating: 0.0
    },
    {
        ISBN13: "9781449331818",
        title: "Learning JavaScript Design Patterns",
        author: 4,
        publish_date: "2012-07-01T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 254,
        quantity: 4,
        description:
            "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
        price: 500,
        website:
            "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",

        book_img: "/images/book2",
        genre: ["Programming", "Javascript", "Computer Science"],
        rating: 0.0
    },
    {
        ISBN13: "9781449365035",
        title: "Speaking JavaScript",
        author: 8,
        publish_date: "2014-02-01T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 460,
        quantity: 6,
        description:
            "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
        price: 500,
        website: "http://speakingjs.com/",

        book_img: "/images/book3",
        genre: ["Programming", "Javascript", "Computer Science"],
        rating: 0.0
    },
    {
        ISBN13: "9781491950296",
        title: "Programming JavaScript Applications",
        author: 3,
        publish_date: "2014-07-01T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 254,
        quantity: 7,
        description:
            "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
        price: 500,
        website:
            "http://chimera.labs.oreilly.com/books/1234000000262/index.html",

        book_img: "/images/book4",
        genre: ["Programming", "Javascript", "Computer Science"],
        rating: 0.0
    },
    {
        ISBN13: "9781593277574",
        title: "Understanding ECMAScript 6",
        author: 5,
        publish_date: "2016-09-03T00:00:00.000Z",
        publisher: "No Starch Press",
        pages: 352,
        quantity: 2,
        description:
            "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
        price: 500,
        website: "https://leanpub.com/understandinges6/read",

        book_img: "/images/book5",
        genre: ["Programming", "Javascript", "Computer Science"],
        rating: 0.0
    },
    {
        ISBN13: "9781491904244",
        title: "You Don't Know JS",
        author: 6,
        publish_date: "2015-12-27T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 278,
        quantity: 5,
        description:
            'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the "You Don\'t Know JS" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.',
        price: 480,
        website:
            "https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond",

        book_img: "/images/book6",
        genre: ["Programming", "Javascript", "Computer Science"],
        rating: 0.0
    },
    {
        ISBN13: "9781449325862",
        title: "Git Pocket Guide",
        author: 2,
        publish_date: "2013-08-02T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 234,
        quantity: 9,
        description:
            "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git experience.",
        price: 500,
        website:
            "http://chimera.labs.oreilly.com/books/1230000000561/index.html",
        book_img: "/images/book7",
        genre: ["Programming", "Git", "Computer Science"],
        rating: 0.0
    },
    {
        ISBN13: "9781449337711",
        title: "Designing Evolvable Web APIs with ASP.NET",
        author: 7,
        publish_date: "2014-04-07T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 538,
        quantity: 27,
        description:
            "Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft’s ASP.NET Web API framework. In the process, you’ll learn how design and implement a real-world Web API.",
        price: 600,
        website:
            "http://chimera.labs.oreilly.com/books/1234000001708/index.html",

        book_img: "/images/book8",
        genre: ["Programming", "Web Development", "Computer Science", ".NET"]
    }
];

var authorData = [
    {
        author_id: 1,
        name: "Marijn Haverbeke",
        description: "Marijn Haverbeke is an independent developer and author, focusing mostly on programming languages and tools for programmers. He spends most of his time working on open-source software, such as the CodeMirror editor and the Tern type inference engine for JavaScript.",
        dob: "2014-04-07T00:00:00.000Z",
        author_img: "/images/author1"
    },
    {
        author_id: 2,
        name: "Richard E. Silverman",
        description: "Richard Silverman first touched a computer as a college junior in 1986, when he logged into a DEC-20, typed MM to send some mail, and was promptly lost to the world. He eventually resurfaced and discovered he had a career, which was convenient but somewhat disorienting, since he hadn't really been looking for one. Since earning his B.A. in computer science and M.A. in pure mathematics, Richard has worked in the fields of networking, formal methods in software development, public-key infrastructure, computer security, and Unix systems administration. He is a co-author on two O'Reilly titles: SSH, The Secure Shell (The Definitive Guide) and the Linux Security Cookbook, and author of the Git Pocket Guide.",
        dob: "2014-04-07T00:00:00.000Z",
        author_img: "/images/author2"
    },
    {
        author_id: 3,
        name: "Eric Elliott",
        description: "Eric Elliott is a veteran JavaScript application architect. He has contributed to software experiences for Adobe Systems, Zumba Fitness, The Wall Street Journal, ESPN, BBC, and top recording artists including Usher, Frank Ocean, Metallica, and many more. He is an author, frequent public speaker, and consultant. He lives in the San Francisco bay area with the most beautiful woman in the world.",
        dob: "2014-04-07T00:00:00.000Z",
        author_img: "/images/author3"
    },
    {
        author_id: 4,
        name: "Addy Osmani",
        description: "Addy Osmani is an engineering manager at Google working on Chrome. He is author of open-source projects like Yeoman, TodoMVC and Material Design Lite. He has also written books like Learning JavaScript Design Patterns with O'Reilly.",
        dob: "2014-04-07T00:00:00.000Z",
        author_img: "/images/author4"
    },
    {
        author_id: 5,
        name: "Nicholas C. Zakas",
        description: "Nicholas C. Zakas has been working on web applications since 2000, focusing on frontend development, and is known for writing and speaking about frontend best practices. He honed his experience during his five years at Yahoo!, where he was principal frontend engineer for the Yahoo! home page. He is the author of several books, including The Principles of Object-Oriented JavaScript (No Starch Press) and Professional JavaScript for Web Developers (Wrox).",
        dob: "2014-04-07T00:00:00.000Z",
        author_img: "/images/author5"
    },
    {
        author_id: 6,
        name: "Kyle Simpson",
        description: "Kyle Simpson is an Open Web Evangelist who's passionate about all things JavaScript. He's an author, workshop trainer, tech speaker, and OSS contributor/leader.",
        dob: "2014-04-07T00:00:00.000Z",
        author_img: "/images/author6"
    },
    {
        author_id: 7,
        name: "Glenn Block",
        description: "Glenn is arguably one of the reasons why Microsoft is more open today. He was a catalyst for several open source efforts at Microsoft including ASP.NET Web API and Microsoft's support for Node.js in Azure. Since Microsoft he has led efforts in Splunk's developer platform and is now running product management for Webtask at Auth0.",
        dob: "2014-04-07T00:00:00.000Z",
        author_img: "/images/author7"
    },
    {
        author_id: 8,
        name: "Axel Rauschmayer",
        description: "Dr. Axel Rauschmayer specializes in JavaScript and web development. He teaches classes for Ecmanauten, blogs at 2ality.com, holds talks and workshops at conferences and organizes the MunichJS user group. Axel has been programming since 1985 and developing web applications since 1995.",
        dob: "2014-04-07T00:00:00.000Z",
        author_img: "/images/author8"
    }
];

function seedDB() {
    Author.remove({})
        .then(() => {
            console.log("Removed all Authors from the DB!");
            authorData.forEach(seed => {
                Author.create(seed, (error, author) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Added a new author");
                    }
                });
            });
        })
        .catch(err => {
            console.log(err);
        });

    //remove all books then regenerate
    Book.remove({})
        .then(() => {
            console.log("Removed all Books from the DB!");
            bookData.forEach(seed => {
                Book.create(seed, (error, book) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Added a new book");
                    }
                });
            });
        })
        .catch(err => {
            console.log(err);
        });
}

//export the function
module.exports = seedDB;
