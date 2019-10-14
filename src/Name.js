import React, { useState, useEffect } from 'react';

function Name() {

    const [name, setName]= useState('Tanaka');

    useEffect(function persistForm(){
        localStorage.setItem('formData', name);

    });

    const [surname, setSurname] = useState('Tomi');

    useEffect(function updateTitle(){
        document.title = name + ' '+ surname;
    });


    return null;
}

export default Name;