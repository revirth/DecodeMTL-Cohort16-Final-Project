
// currently analyze comments and returns an array of baddies 
// need to work on displaying the baddies UI


// import "./neural_net.js"
import "./data.js"
// import "./chitchatdata.js"
import { Component } from "react";
import "./sky_net.scss";
class Sky_net extends Component {
    constructor() {
        super();
        this.state = {
            show: "Hello World!", // display text window
            commandsVisible: 0,
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
    initialise() {

        this.setState({ show: "Loading..." })

        sky_net = new brain.recurrent.LSTM();
        sky_net.train(trainingData, {
            iterations: 200,
            erroThresh: 0.011
        });


        let test1 = sky_net.run("I would not recommend it to my friends")
        let test2 = sky_net.run("I was very happy with my order")
        let test3 = sky_net.run("I had a bad experience ordering with them")


        console.log(test1, test2, test3, "Hello World!")

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
        rawreviews = []
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

            this.setState({ show: "Comments retrievew and are being analyzed" })

            for (let i = 0; i < reviews.length; i++) {
                predictions.push(sky_net.run(reviews[i]))
            }

            // store the array of predictions in the state

            this.setState({ prediction: predictions })
            this.setState({ show: "I finished my task" })

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
        for (var i = 0; i < reviews.length; i++) {
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


    close() {
        this.setState({ show: "Goodbye !" })
        onClick = setState({ commandsVisible: false })


        setTimeout(this.setState({ show: "If you need more help I'm still here ;\)" }, 2000))
        setTimeout(this.setState({ show: "Humans..." }, 4000))
    }

    display() {
        onClick = setState({ commandsVisible: true })
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