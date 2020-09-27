import React from 'react'
import { Modal, Typography, Button } from '@material-ui/core'
import '../../firebase';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';

function CompletedApproval(props) {
    const db = firebase.firestore();

    const useStyles = makeStyles((theme) => ({

        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        }));
        
        const classes = useStyles();

        const addToArchive = (event) => {
            //stop refresh
            event.preventDefault();
            //add to db; no need for spread since a new snapshot will trigger the map in use effect
            db.collection('archive').add({
              archivedTodo: props.todo,
              archivedDescription: props.description,
              archivedDateCreated: props.dateCreated,
              archivedDateDeadline: props.dateDeadline,
              archivedModifiedDate: !props.modifiedDate ? "N/A" : props.modifiedDate,
              //archivedCompleted: firebase.firestore.FieldValue.serverTimestamp(),
              archivedCompleted: new Date(Date.now()),
              archivedPriorityLevel: props.priorityLevel
            })
            //props.history.push('/tasks');
          }

    return (
        <div>
            <Modal    
                open={props.isArchiveOpen}
                onClose={() => props.setIsArchiveOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                 <div 
                    className={classes.paper}
                    style={{    
                        width:'auto',        
                        position:'absolute',
                        top:'50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div 
                        className="completeHeader"
                    >
                    <h2 id="simple-modal-title">Complete Confirmation</h2>
                    </div>
                    <Typography 
                        id="simple-modal-description"
                        style={{marginBottom:'10px'}}
                    >
                        Did you complete task?
                    </Typography>
                <Button
                    onClick={addToArchive}
                    >Yes
                </Button>
                <Button
                    onClick={() => props.setIsArchiveOpen(false)}
                    >No
                </Button>
                </div>
            </Modal>
        </div>
    )
}

export default CompletedApproval