import React from "react";
import {Button, Typography} from "@mui/material";
import {Toolbar} from "@mui/material";

import {Link} from "react-router-dom";

function Header() {

    return (
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                DAO Creator
            </Typography>

            <Button component={Link} to='/compiler' variant="contained" sx={{ margin: 1 }}>
                Compiler
            </Button>
            <Button component={Link} to='/airdrop' variant="contained"  sx={{ margin: 1 }}>
                Airdrop
            </Button>
            <Button component={Link} to='/voting' variant="contained" sx={{ margin: 1 }}>
                Voting
            </Button>
        </Toolbar>
    )
}

export default Header;