import React from 'react';
import './styles.css';

const Collection = ({names, deleteName}) => (
    <div>
    {
            names.length > 0 ? (
                names.map(name => (
                    <div className="collection" key={name._id}>
                        <a href="#!" className="collection-item " >
                            {name.name}
                            <i className="material-icons" onClick={ () => {deleteName(name._id)} }>delete</i>
                        </a>
                    </div>
            ))
            ) : (
                <p>no names in the database</p>
            )
            
        }
    </div>
        
   
);

export default  Collection;