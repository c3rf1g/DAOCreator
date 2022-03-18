import React, {useState} from 'react';
import CreateVote from "./CreateVote";

const MainDAOPage = () => {
    const [votes, setVotes] = useState(JSON.parse(localStorage.getItem('votes')) || [])
    return (
        <div>
            You are in DAO!
            <CreateVote votes={votes} setVotes={setVotes}/>
            {
                votes.map(vote => (
                    <div key={vote + votes.indexOf(vote)}>{vote}</div>
                ))
            }
        </div>
    );
};

export default MainDAOPage;