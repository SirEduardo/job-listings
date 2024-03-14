import { useEffect, useState } from 'react';
import data from './data.json';
import { User } from './types';


export function Profiles (){
    const [usuarios, setUsuarios] = useState<User[]>([]);

    useEffect(() =>{
        setUsuarios(data);
    }, []);
    return(
        <div className="profiles">
            {usuarios.map ((usuario, index) =>(
            <div key={usuario.id} className='profile'>
                <div className='profile-data'>
                    <div className="img">
                        <img src={usuario.logo} alt='Avatar'/>
                    </div>
                <div className='data'>
                    <div className='company'>
                        <span>{usuario.company}</span>
                        {usuario.new && <span className="new">New!</span>}
                        {usuario.featured && <span className="featured">Featured</span>}
                    </div>
                    <h3>{usuario.position}</h3>
                    <div className='job-type'>
                        <p>{usuario.postedAt}</p>
                        {index < usuarios.length - 1 && <p className='punto'> · </p>}
                        <p>{usuario.contract}</p>
                        {index < usuarios.length - 1 && <p className='punto'> · </p>}
                        <p>{usuario.location}</p>
                    </div> 
                </div>    
                </div>
                <div className='filter'>
                    <button className='role'>{usuario.role}</button>
                    <button className='level'>{usuario.level}</button>
                    {usuario.languages.map((language,Index) =>(
                        <button className='languages' key={Index}>{language}</button>
                    ))}
                    {usuario.tools.map((tools, Index) => (
                        <button className='tools' key={Index}>{tools}</button>
                    ))}
                </div>
            </div>   
            ))}      
        </div>
    )
}