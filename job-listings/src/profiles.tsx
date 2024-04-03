import { useEffect, useState } from "react";
import data from "./data.json";
import { User } from "./types";

export function Profiles() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<User[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string | null }>({
    role: null,
    level: null,
    languages: null,
    tools: null,
  });
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    role: [],
    level: [],
    languages: [],
    tools: [],
  });

  const handleFilter = (filterType: string, value: string | null) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    if (value) {
      setSelectedFilters((prevSelected) => ({
        ...prevSelected,
        [filterType]: [...prevSelected[filterType], value],
      }));
    }
  };
  const removeFilters = (filterType: string, filterValue: string) => {
    setSelectedFilters((prevSelected) => ({
      ...prevSelected,
      [filterType]: prevSelected[filterType].filter(
        (filter) => filter !== filterValue
      ),
    }));
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: null }));
  };
  const clearAllFilters = () => {
    setSelectedFilters({
      role: [],
      level: [],
      languages: [],
      tools: [],
    });
    setFilters({
      role: null,
      level: null,
      languages: null,
      tools: null,
    });
  };

  useEffect(() => {
    setUsuarios(data);
  }, []);

  useEffect(() => {
    const filteredUsers = usuarios.filter((user) => {
      for (const filterType in filters) {
        if (filters[filterType] && user[filterType] !== filters[filterType]) {
          return false;
        }
      }
      return true;
    });
    setFilteredUsuarios(filteredUsers);
  }, [filters, usuarios]);

  return (
    <div className="profiles">
      <div className="filter-tags">
        {Object.entries(selectedFilters).map(([filterType, filterValues]) =>
          filterValues.map((filterValue, index) => (
            <div
              key={`${filterType}-${filterValue}-${index}`}
              className="filter-tag"
            >
              <span>
                {filterValue}
                <button
                  className="x-button"
                  onClick={() => removeFilters(filterType, filterValue)}
                >
                  X
                </button>
              </span>
            </div>
          ))
        )}
        {Object.values(selectedFilters).some(
          (filterValues) => filterValues.length > 0
        ) && (
          <div className="clear">
            <button onClick={clearAllFilters}>Clear</button>
          </div>
        )}
      </div>
      {filteredUsuarios.map((usuario, index) => (
        <div key={usuario.id} className="profile">
          <div className="profile-data">
            <div className="img">
              <img src={usuario.logo} alt="Avatar" />
            </div>
            <div className="data">
              <div className="company">
                <span>{usuario.company}</span>
                {usuario.new && <span className="new">NEW!</span>}
                {usuario.featured && <span className="featured">FEATURED</span>}
              </div>
              <h3>{usuario.position}</h3>
              <div className="job-type">
                <p>{usuario.postedAt}</p>
                {index < usuarios.length - 1 && <p className="punto"> · </p>}
                <p>{usuario.contract}</p>
                {index < usuarios.length - 1 && <p className="punto"> · </p>}
                <p>{usuario.location}</p>
              </div>
            </div>
          </div>
          <div className="filter">
            <button
              className="role"
              onClick={() => handleFilter("role", usuario.role)}
            >
              {usuario.role}
            </button>
            <button
              className="level"
              onClick={() => handleFilter("level", usuario.level)}
            >
              {usuario.level}
            </button>
            {usuario.languages.map((language, index) => (
              <button
                className="languages"
                key={index}
                onClick={() => handleFilter("languages", language)}
              >
                {language}
              </button>
            ))}
            {usuario.tools.map((tool, index) => (
              <button
                className="tools"
                key={index}
                onClick={() => handleFilter("tools", tool)}
              >
                {tool}
              </button>
            ))}
          </div> 
        </div>
      ))}
    </div>
  );
}
