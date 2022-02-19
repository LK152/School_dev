const { createContext, useContext, useState, useEffect } = require('react');
import axios from 'axios';

const dataContext = createContext();

const useData = () => {
	return useContext(dataContext);
};

export const DataProvider = (props) => {
	useEffect(() => {
        
    }, []);

	const value = {};

	return <dataContext.Provider value={value} {...props} />;
};

export default useData;
