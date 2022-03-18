import React, {useEffect, useState} from 'react';

const CreateVote = (props) => {
    const [voteFields, setVoteFields] = useState({})
    const [voteName, setVoteName] = useState("")
    const [voteField1, setVoteField1] = useState("")
    const [voteField2, setVoteField2] = useState("")
    const [clickableCreateButton, setClickableCreateButton] = useState(false)
    const createVotes = () => {
        if (clickableCreateButton){
            const input = document.getElementsByClassName("voteNameInput")[0].value
            const field1 = document.getElementsByClassName("Field1")[0].value
            const field2 = document.getElementsByClassName("Field2")[0].value
            console.log(input)
            localStorage.setItem('votes', JSON.stringify([...props.votes, {
                voteName: input,
                field1: field1,
                field2: field2
            }]))
            props.setVotes([...props.votes, {
                voteName: input,
                field1: field1,
                field2: field2
            }])
        }
    }
    useEffect(() => {
        if (voteName.length && voteField1.length && voteField2.length){
            document.getElementsByClassName("CreateVoteButton")[0].style.backgroundColor = 'hotpink'
            setClickableCreateButton(true)
        } else {
            document.getElementsByClassName("CreateVoteButton")[0].style.backgroundColor = 'gray'
            setClickableCreateButton(false)
        }
    }, [voteName, voteField1, voteField2])
    const checkFilled = (e) => {
        const newKey = e.target.placeholder
        const item = e.target.value
        if (newKey === "Vote name") {
            setVoteName(item)
        } else if (newKey === "First option") {
            setVoteField1(item)
        } else if (newKey === "Second option") {
            setVoteField2(item)
        }
        console.log(newKey, item)
    }
    return (
        <div>
            <div>
                <input onChange={checkFilled} className="voteNameInput" placeholder="Vote name"/>
                <div>
                    <input className="Field1" onChange={checkFilled} placeholder="First option"/>
                    <input className="Field2" onChange={checkFilled} placeholder="Second option"/>
                </div>
            </div>
            <button onClick={createVotes} className="CreateVoteButton">Create Vote</button>
        </div>
    );
};

export default CreateVote;