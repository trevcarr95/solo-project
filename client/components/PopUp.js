import React, { Component } from "react";
import ThankYou from './ThankYou';

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            performer: '',
            venue: '',
            address: '',
            date: '',
            time: '',
            cover: '',
            submitted: true
        }
        this.toggle=this.props.toggle;
        this.handlePerformerChange = this.handleChange.bind(this, 'performer');
        this.handleVenueChange = this.handleChange.bind(this, 'venue');
        this.handleAddressChange = this.handleChange.bind(this, 'address');
        this.handleDateChange = this.handleChange.bind(this, 'date');
        this.handleTimeChange = this.handleChange.bind(this, 'time');
        this.handleCoverChange = this.handleChange.bind(this, 'cover');
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(keyName, e) {
        this.setState({[keyName]: e.target.value})
    }

    handleClose(e) {
        this.toggle();
    }


    handleSubmit(e) {
        e.preventDefault();
        this.toggle();
        const body = {
            performer: this.state.performer,
            venue: this.state.venue,
            address: this.state.address,
            date: this.state.date,
            time: this.state.time,
            cover: this.state.cover
        };
        this.setState({
            performer: '',
            venue: '',
            address: '',
            date: '',
            time: '',
            cover: '', 
            submitted: false
        })
        fetch('/api/submit', {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(body)
          })
          .then(resp => resp.json())
          .then(data => {
            console.log('THIS IS THE DATA IN POPUP.JS', data);
          })
          .catch(err => console.log('THIS IS IN POPUP.JS : ERROR: ', err));
    }

    render() {
        return (
            <div className='submit-popup'>
                <div className='submit-popup-content'>
                    <span className='close' onClick={this.handleClose}>&times;</span>
                    {/* <form className='close' onClick={this.handleClick}>&times;</form> */}
                    <div className='container'>
                        <h3 id='deetz'>Give Us The Deetz!</h3>
                        <label id='performer'>
                            Performer:
                            <input onChange={this.handlePerformerChange} type='text' value = {this.state.performer} />
                        </label>
                        <label id='venue'>
                            Venue:
                            <input onChange={this.handleVenueChange} type='text' value = {this.state.venue} />
                        </label>
                        <label id='address'>
                            Address:
                            <input onChange={this.handleAddressChange} type='text' value = {this.state.address} placeholder='Street Address, City, State, Zip' />
                        </label>
                        <label id='date'>
                            Date:
                            <input onChange={this.handleDateChange} type='text' value = {this.state.date} placeholder='MM/DD/YY' />
                        </label>
                        <label id='time'>
                            Time:
                            <input onChange={this.handleTimeChange} type='text' value = {this.state.time} placeholder='E.g.: 8PM'/>
                        </label>
                        <label id='cover'>
                            Cover:
                            <input onChange={this.handleCoverChange} type='text' placeholder = '$' value = {this.state.cover} />
                        </label>
                        <br />
                        {/* <form onSubmit={this.handleSubmit}> */}
                        {/* <input id='send-info' type='submit' value='submit' text ='Submit'/> */}
                        <button id='send-info' onClick={this.handleSubmit}>Submit</button>
                        <h3>Thank you for your submission!</h3>
                        {/* {this.state.submitted ? <ThankYou toggle={this.toggle} handleClose = {this.handleClose} /> : null} */}
                        {/* </form>  */}
                    </div>
                </div>
            </div>
        )
    }
}


export default PopUp