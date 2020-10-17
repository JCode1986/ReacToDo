import React, { useContext, useState, useEffect } from 'react'
import { TodoContext } from '../context/TodoContext';
import { Typography, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Loading from '../loading/Loading';
import ProfileMenu from './ProfileMenu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase';
import app from '../../firebase';

function NavBarToolBar(props) {
  const user = firebase.auth().currentUser;
  const db = app.firestore();
  const { setIsVideoPlaying, setIsPending, isPending, setName, name } = useContext(TodoContext);
  const [updatedName, setUpdatedName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const users = db.collection('users');

  async function fetchFunction() {
    try{
    setIsPending(true)
    const doc = await users.doc(user.uid).collection('displayName').doc('name').get();
        if (!doc.exists) {
          setUpdatedName(user.displayName);
          setIsPending(false)
          return;
        } else {
          setName(doc.data().displayName);
          setUpdatedName(doc.data().displayName);
          setIsPending(false)
          return;
        }
      }
      catch(error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      fetchFunction();
      setUpdatedName(name);
  }, [])

  if(isPending) return <div style={{ display:"none" }}><Loading /></div>

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const doIt = () => {
        setIsVideoPlaying(false);
        props.history.push('/tasks');
    }
    
    return (
        <Toolbar>
        <ProfileMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleClose={handleClose}
          updatedName={updatedName}
          setUpdatedName={setUpdatedName}
        />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          onClose={props.handleDrawerClose}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        {
          user?
            <img 
              src={require("./do-it-logo.png")} 
              alt="Do It!"
              style={{height:'60px', cursor:'pointer'}}
              onClick={doIt}           
            />
            :
            <img 
            src={require("./do-it-logo.png")} 
            style={{height:'60px'}}
            alt="Do It!"
            />
        }
      <div style={{marginLeft:"auto"}}>
        {
          !user ?
          <Typography>
            Not logged in
          </Typography>
          :
          user ?
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >            
            <img 
              className="userPhoto"src={user.photoURL} 
              alt={user.displayName} 
              onClick={handleClick}
            /> 
            <Typography>
            {updatedName}
          </Typography>
          </Grid>
          :
          <Typography>
            User: {user.email} 
          </Typography>
        }
      </div>
      </Toolbar>
    )
}

export default withRouter(NavBarToolBar);
