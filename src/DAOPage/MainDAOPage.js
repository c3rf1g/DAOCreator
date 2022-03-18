import React, {useState} from 'react';
import CreateVote from "./CreateVote";
import Vote from "./Vote";
import VoteList from "./VoteList";

const MainDAOPage = (props) => {
    const [votes, setVotes] = useState(JSON.parse(localStorage.getItem('votes')) || [])
    return (
        <div>
            You are in DAO!
            <CreateVote Dao={props.DAOAddress} votes={votes} setVotes={setVotes}/>
            <VoteList>
                {
                    votes.map((vote, index) => (
                        <Vote Dao={props.DAOAddress} key={vote + index} index={index} vote={vote} />
                    ))
                }
            </VoteList>
        </div>
    );
};

export default MainDAOPage;