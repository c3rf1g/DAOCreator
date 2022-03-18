import React, {useState} from 'react';

const CreateVote = (props) => {

    const createVotes = () => {
        const input = document.getElementsByClassName("voteNameInput")[0].value
        console.log(input)
        localStorage.setItem('votes', JSON.stringify([...props.votes, input]))
        props.setVotes([...props.votes, input])
    }
    return (
        <div>
            <div>
                <input className="voteNameInput" placeholder="Vote name"/>
            </div>
            <button onClick={createVotes} className="CreateVoteButton">Create Vote</button>
        </div>
    );
};

export default CreateVote;