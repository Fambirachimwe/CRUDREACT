import React from 'react';


class FormComponent extends React.Component {

    constructor(){
        super();
        this.state ={
            name: null
        }
    }

    
    handleSubmit = (e) =>{
        // e.preventDefault();
        // window.location.reload(false); // temporary example
        this.props.addName(this.state);  //accessing the addName from the homepage component 
        
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
        
    }


    render() {
        return(
            <div className="row">
            <div className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="autocomplete-input">Enter Name</label>
                            <input type="text" id="name" onChange={this.handleChange} />
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
        )
        
    }


}



export default FormComponent;
