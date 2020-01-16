import React from 'react';
import Collection from './collection.component';
import FormComponent from './form.component';
import axios from 'axios';
// import mongoose from 'mongoose';

import io from 'socket.io-client';





class HomePageComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            names : []
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:4000/names').then(data =>{
            // console.log(data);  
            
           this.setState({
               names: data.data
           })
           
        });
        // socket.emit('mounted', {data: 'the home component mounted'});

       
    }


    
    addName = (name) => {
        const socket = io('http://127.0.0.1:4000/');
        
        axios.post('http://127.0.0.1:4000/names', {
            name: name
        }).then(payload => {
            
            socket.emit('dbchange',  {payload: payload.data});
        });

        socket.on('change', (payload) =>{
            // console.log(payload.payload.payload.response);
            // console.log(this.state.names.length)
            
            if(this.state.names.length === 0){
                // console.log('no items in the state');
                this.setState({
                    names: [payload.payload.payload.response]
                })
                socket.disconnect()
            } 
            else{
                const names = [...this.state.names, payload.payload.payload.response ]
                this.setState({
                    names: names
                })
                socket.disconnect()
            }
        })
               


        
            // this.setState({
            //     names: names
            // });

            // socket.disconnect()
    

    }

    deleteName = (_id) => {
        // let names = this.state.names.filter(name => {
        //     return name._id !== _id
        // });
        // this.setState({
        //     names : names
        // });
        axios.delete(`http://127.0.0.1:4000/names/${_id}`)
        .then(res => {
            // window.location.reload(false);  
        })
    }



    render(){
        
        return (
            <div className="container">
                <h6>Names</h6>
                <Collection deleteName={this.deleteName} names={this.state.names} />
                <FormComponent addName={this.addName} />
            </div>
        )
    }
}

export default HomePageComponent;
