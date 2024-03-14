import { useEffect, useState } from 'react';
import data from './data.json';
import { User } from './types';


export function Profiles (){
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState<User[]>([]);
    const [filters, setFilters] = useState<{[key:string]:string | null}>({
        role:null,
        level:null,
        language:null,
        tool:null,
    })
    const [selectedFilters, setSelectedFilters] = useState<{[key:string]:string[]}>({
        role:[],
        level:[],
        language:[],
        tool:[]
    });


    const handleFilter = (filterType:string,value:string|null) => {
        setFilters({ ...filters, [filterType]:value });
        if (value) {
            setSelectedFilters(prevSelected => ({
                ...prevSelected,
                [filterType]:[...prevSelected[filterType],value]
            }))
    }
}
    const removeFilters = (filterType:string,filterValue:string) =>{
        setSelectedFilters(prevSelected => ({
            ...prevSelected,
            [filterType]: prevSelected[filterType].filter(filter =>filter !== filterValue)
        }))
        setFilters({...filters,[filterType]:null})
    }

   


    useEffect(() =>{
        setUsuarios(data);
    }, []);

    useEffect(() => {
        let filteredUsers = usuarios;
        for(const filterType in filters) {
            if (filters[filterType]) {
                filteredUsers = filteredUsers.filter(user => user[filterType] === filters[filterType])
            }
        }
        setFilteredUsuarios(filteredUsers);
    },[filters,usuarios]);
 
    return(
        <div className="profiles">
            {Object.keys(selectedFilters).map(filterType => (
            <div className='filter-tags'>
                {selectedFilters[filterType].map(filterValue =>(
                    <div key={filterValue} className='filter-tag'>
                        <span>{filterValue}</span>
                        <button onClick={() => removeFilters(filterType,filterValue)}>X</button>
                        </div>
                ))}
            </div>
            ))}
            {filteredUsuarios.map ((usuario, index) =>(
            <div key={usuario.id} className='profile'>
                <div className='profile-data'>
                    <div className="img">
                        <img src={usuario.logo} alt='Avatar'/>
                    </div>
                <div className='data'>
                    <div className='company'>
                        <span>{usuario.company}</span>
                        {usuario.new && <span className="new">NEW!</span>}
                        {usuario.featured && <span className="featured">FEATURED</span>}
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
                    <button className='role' onClick={() => handleFilter('role',usuario.role)}>{usuario.role}</button>
                    <button className='level' onClick={() =>handleFilter('level',usuario.level)}>{usuario.level}</button>
                    {usuario.languages.map((language, Index) =>(
                        <button className='languages' key={Index} onClick={() => handleFilter('language',language)}>{language}</button>
                    ))}
                    {usuario.tools.map((tool,Index) => (
                        <button className='tools' key={Index} onClick={() => handleFilter('tool',tool)}>{tool}</button>
                    ))}
                </div>
            </div>   
            ))}      
        </div>
    )
}