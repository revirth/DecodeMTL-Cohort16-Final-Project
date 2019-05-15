import "./neural_net.js"
import "./data.js"
import "./chitchatdata.js"
import { Component } from "react";
import "./sky_net.scss";

class Sky_net extends Component {
    constructor() {
        super();
        this.state = { predicts: "" };
    }
    /* initialise and train on data.js content
     return sky_net which is the trained neural net
     this may take 20-40 seconds 
    */
    initialise() {
        let sky_net = new brain.recurrent.LSTM();
        sky_net.train(trainingData, {
            iterations: 200,
            erroThresh: 0.011
        });


        let test1 = sky_net.run("I would not recommend it to my friends")
        let test2 = sky_net.run("I was very happy with my order")
        let test3 = sky_net.run("I had a bad experience ordering with them")


        console.log(test1, test2, test3, "Hello World!")

        return sky_net;
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
    predict() {

        let trimmed = ""

        if (this.state.predict.length >= 40) {
            trimmed = this.state.predict.slice(0, 40);
        } else {
            trimmed = this.state.predict
        }

        let cleanString = trimmed.replace(/[\|&;\(0)(1)(2)(3)(4)(5)(6)(7)(8)(9)"-<>\(\)\+,.±!@@##$%^&*()_+]/g, "");
        let allLowerCase = cleanString.replace(/[A-Z]/g, function (x) { return x.toLowerCase(); })

        let prediction = sky_net.run(allLowerCase)

        return prediction
    }

    /*
    sky_net will output suggestions to optimise SEO,
    give supportive feedback and other fun stuff. 

    */
    chitchat() {
        // random comments from chitchat array of strings
        // returns a string 
        let randomNum = Math.ceil((Math.random) * chitChatData.length);

        let randomChat = chitChatData[randomNum]


        return randomChat;

    }
    evaluate() {
        alert("error detected, need immediate attention");




    }
    render() {
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
                            <p>All your base are belong to us</p></div>
                    </div>
                    <div className='commands'><p>How can I help you ?</p><ul>
                        <li onClick={this.initialise}>Initialize</li>
                        <li onClick={this.predict}>Scan Comments</li>
                        <li onClick={this.chitchat}>What is the meaning of life</li>
                        <li onClick={this.evaluate}>Destroy all Evil</li>
                    </ul>
                    </div>

                </div>


            </div>




        )
    }









}

export default Sky_net