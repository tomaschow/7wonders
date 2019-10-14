import React, { useState, useEffect } from 'react';

function Counter() {
    const [count, mySet] = useState(0);
    const [age, ageSet] = useState(18);

    useEffect(()=>{
        document.title = `You clicked ${count} times`;
        // Adding side effects to hook, reducing calling to 1 times here.
        // Tells react to do something after each render
    });
    return(
        <div>
            <p>You clicked {count} times.</p>
            <button onClick={()=>mySet(count+1)}>
                Click here
            </button>
            <button onClick={()=>mySet(0)}>
                Reset
            </button>
            <p>Jake is {age} old.</p>
            <button onClick={()=>ageSet(age+1)}>
                +1 Year
            </button>
            <button onClick={()=>ageSet(18)}>
                Reset
            </button>

        </div>
    );

}

export default Counter;