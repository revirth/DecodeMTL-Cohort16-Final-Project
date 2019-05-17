
// currently analyze comments and returns an array of baddies 
// need to work on displaying the baddies UI
import brain from "brain.js"
import React from "react"
// import trainingData from "./data.js"
// import "./neural_net.js"
// import "./chitchatdata.js"
import { Component } from "react";
import "./sky_net.scss";
class Sky_net extends Component {
    constructor() {
        super();
        this.state = {
            show: "WARNING DO NOT CLICK", // display text window
            commandsVisible: 1,
            trained_net: {}, // trained net after initialise method
            comments: [], // array of cleaned reviews, only content
            prediction: [], // array of string, 'good' or 'bad' based on trained_net
            baddies: [] // array of users with bad comments

        };
    }
    /* initialise and train on data.js content
     return sky_net which is the trained neural net
     this may take 20-40 seconds 
    */
    initialise = () => {
        this.setState({ show: "Loading..." })
        let dataz = [
            { input: 'i am super happy', output: 'happy' },
            { input: 'what a trhill', output: 'bad' },
            { input: 'food was delicious awesome service', output: 'happy' },
            { input: 'this is the best food ever', output: 'happy' },
            { input: 'i am satisfied', output: 'happy' },
            { input: 'I am satisfied', output: 'happy' },
            { input: 'i hated the service and the food', output: 'bad' },
            { input: 'would not recommend to anyone', output: 'bad' },
            { input: 'this is the worst place to eat in montreal', output: 'bad' },
            { input: 'i am satisfied', output: 'happy' },
            { input: 'i was happy with my order', output: 'happy' },
            { input: 'i am happy!', output: 'happy' },
            { input: 'the food was terrible', output: 'bad' },
            { input: 'i would never order from there again', output: 'bad' },
            { input: 'i was disapointed', output: 'bad' },
            { input: 'i was very disapointed', output: 'bad' },
            { input: 'the food tasted like shit', output: 'bad' },
            { input: 'the food tasted like crap', output: 'bad' },
            { input: 'omg best service', output: 'happy' },
            { input: 'i would recommend it to my friends', output: 'happy' },
            { input: 'delicious food, great service', output: 'happy' },
            { input: 'best choice out there', output: 'happy' },
            { input: 'quick delivery, fast and effective', output: 'happy' },
            { input: 'i would not recommend', output: 'bad' },
            { input: 'i would not recommend it to my friends', output: 'bad' },
            { input: 'very large choice of meals easy to order and interesting offers to watch for great', output: 'happy' },
            { input: 'i already set a record for ordering from them every week today i ordered twice', output: 'happy' },
            { input: 'very satisfied with alce they take care when delivering always on time great variety of choices', output: 'happy' },
            { input: 'very bad quality and slow', output: 'bad' },
            { input: 'bad and slow', output: 'bad' },
            { input: 'i was very disapointed with my order', output: 'bad' },
            { input: 'the vegetables where rotten', output: 'bad' },
            { input: 'taste was weird', output: 'bad' },
            { input: 'really bad first experice', output: 'bad' },
            { input: 'bad after sale service', output: 'bad' },
            { input: 'taste was not what i expected', output: 'bad' },
            { input: 'i had to put it to the garbage', output: 'bad' },
            { input: 'bad experience', output: 'bad' },
            { input: 'i had a really bad experience with them', output: 'bad' },
            { input: 'alot of errors in my order', output: 'bad' },
            { input: 'i was very happy with my order', output: 'happy' },
            { input: 'this looks really bad', output: 'bad' },
            { input: 'i was very happy with my order', output: 'happy' },
            { input: 'i really did not liked the spagetthi', output: 'bad' },
            { input: 'i had to trow half the food to the garbage', output: 'bad' },
            { input: 'i had a bad experience ordering with them', output: 'bad' },


        ];
        var t0 = performance.now();
        let sky_net;
        sky_net = new brain.recurrent.LSTM();
        sky_net.train(dataz, {
            iterations: 200,
            erroThresh: 0.011
        });




        var t1 = performance.now();
        console.log(t0 + "Hello World!" + t1)

        this.setState({ trained_net: sky_net })

        this.setState({ show: "Upgrade completed!" })

        setTimeout(this.setState({ show: "Allow me to scan your comments now" }), 2000)

    }
    /*
    Initialize has to be called first, it will train and return
    the trained neural network. Then the predict method takes
    a string an return predicted value. String is passed with
    props 

    inside predict, a trimming function for both the input
    and the output, input cannot be too long or accuracy
    dimishes greatly and output somethimes sky_net behaves
    in a weird way when faced with a difficult input and will
    output a string containing the desired output so we trim 
    it of the rest to return the correct value, using a sliced
    version of the string and replacing characters with regex

    */

    predict = async () => {
        this.setState({ show: "analyzing..." })
        // returns array of all reviews, [{},{},{},...]
        // need to access 
        let rawreviews = []
        let reviews = await fetch(`/reviews`).then(response => response.json());
        for (var i = 0; i < reviews.length; i++) {
            rawreviews.push(reviews[i]["content"]);
        }
        // now we have an array of string containing the comments

        // store the reviews into rawreviews
        this.setState({ comments: rawreviews })

        function arrCleaner(arr) {
            let reviews = []
            for (i = 0; i < arr.length; i++) {
                reviews.push(arr[i])
                console.log(reviews)
            }
            // at this point we have an array of string with the reviews
            // named review ["xsdfas","ysdfdsfa","zfdsfdsa"]...

            // cleaning function for individuals reviews


            // modify the existing array for strings too long

            for (let j = 0; j < reviews.length; j++) {
                if (reviews[j].length >= 45) {
                    reviews[j] = reviews[j].slice(0, 45);
                }
            }

            // modify each element of the array so easier to analyse
            // and more accurate predictions ( no special cars and all
            // lower case)

            for (let i = 0; i < reviews.length; i++) {

                let cleanString = reviews[i].replace(/[\|&;\(0)(1)(2)(3)(4)(5)(6)(7)(8)(9)"-<>\(\)\+,.±!@@##$%^&*()_+]/g, "");
                let cleanString1 = cleanString.replace(/[A-Z]/g, function (x) { return x.toLowerCase(); })

                reviews[i] = cleanString1
            }

            // by now we have an array that is easier to make predicitons


            // changing the values of the array for a string, "good" or "bad"
            // depending on the .run method from current neural net

            let predictions = []

            // this.setState({ show: "Comments retrievew and are being analyzed" })

            let sky_net = this.state.Sky_net

            for (let i = 0; i < reviews.length; i++) {
                predictions.push(sky_net.run(reviews[i]))
            }

            // store the array of predictions in the state

            this.setState({ prediction: predictions })
            // this.setState({ show: "I finished my task" })

        }
        arrCleaner(this.state.comments)
    }

    baddies = async () => {
        let whoAreThebaddies = []
        let indexexOfBadReview = []
        let badreviews = this.state.prediction
        for (var i = 0; i < badreviews.length; i++) {
            if (badreviews[i] === 'bad') {
                indexexOfBadReview.push(i)
            }
        }
        let reviews = await fetch(`/reviews`).then(response => response.json());
        for (var f = 0; f < reviews.length; f++) {
            for (var j = 0; j < indexexOfBadReview.length; j++) {
                if (i === indexexOfBadReview[j]) {
                    whoAreThebaddies.push(reviews[i]["username"])

                }
            }
        }
        this.setState({ baddies: whoAreThebaddies });
    }


    /*
    suggestions() {
        // random comments from chitchat array of strings
        // returns a string 
        let randomNum = Math.ceil((Math.random) * chitChatData.length);

        let randomChat = chitChatData[randomNum]

        // sends the string to the state
        this.setState({ show: randomChat });

    }
*/


    close = () => {
        this.setState({ show: "Goodbye !" })
        this.setState({ commandsVisible: false })


        setTimeout(this.setState({ show: "If you need more help I'm still here ;\)" }, 2000))
        setTimeout(this.setState({ show: "Humans..." }, 4000))
    }

    display = () => {
        this.setState({ commandsVisible: true })
    }



    render() {
        const commandsOverrides = {
            opacity: this.state.commandsVisible ? 1 : 0
        }
        return (
            <div className='sky_net'>
                <div className='container'>
                    <div className='face'>
                        <div className="face__ears">
                            <div className="face__ears__left ear"></div>
                            <div className="face__ears__right ear"></div>
                        </div>
                        <div className="face__body">
                            <div className="face__eyes">
                                <div className="face__eyes--left eye"></div>
                                <div className="face__eyes--right eye"></div>
                            </div>
                            <div className="face__nose">

                                <div className="face__nose--inner">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div className="shadow"></div>


                        <div className="talkative">
                            <p>{this.state.show}</p>
                            <button onClick={this.display}>Display Menu</button></div>

                    </div>



                    <div className='commands' style={commandsOverrides}><p>How can I help you ?</p><ul>
                        <li onClick={this.initialise}>Initialize</li>
                        <li onClick={this.predict}>Scan Comments</li>
                        <li onClick={this.baddies}>Show bad comments</li>
                        <li onClick={this.close}>Close</li>
                    </ul>
                    </div>


                </div>


            </div>




        )
    }
}


export default Sky_net