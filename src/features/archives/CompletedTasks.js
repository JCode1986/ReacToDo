import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import dateFormat from '../date/DateFormat';
import CompletedDetails from './CompletedDetails';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })

function CompletedTasks(props) {
    const db = firebase.firestore();

    const classes = useStyles();

    const [archives, setArchives] = useState([]);
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        db.collection('archive').onSnapshot(snapshot => {
            //returns object with id, and todo
            setArchives(snapshot.docs.map(doc => ({
                id: doc.id, 
                archivedTodo: doc.data().archivedTodo,
                archivedDescription: doc.data().archivedDescription,
                archivedDateCreated: doc.data().archivedDateCreated,
                archivedCompleted: doc.data().archivedCompleted,
                archivedDateDeadline: doc.data().archivedDateDeadline,
                archivedModifiedDate: doc.data().archivedModifiedDate,
                archivedPriorityLevel: doc.data().archivedPriorityLevel
            })))
        })
        }, [db])
        
            //find id
    const details = (id) => {
        setIsModalOpen(true);
        console.log(archives.find((archive) => archive.id === id).archivedDescription, "poop")
        setDescription(archives.find((archive) => archive.id === id).archivedDescription);
    }

    return (
        <>
        <CompletedDetails
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            archives={archives}
            details={details}
            description={description}
        />

        <TableContainer component={Paper} style={{marginTop: '20px'}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Created</TableCell>
              <TableCell align="center">Deadline</TableCell>
              <TableCell align="center">Completed</TableCell>
              <TableCell align="center">Priority Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archives.map((archive) => (
              <TableRow key={archive.id}>
                <TableCell 
                    component="th" 
                    align="center" 
                    scope="row"
                    onClick={() => details(archive.id)}
                    style={{cursor:'pointer'}}
                >
                  {archive.archivedTodo}
                </TableCell>
                <TableCell align="center">{dateFormat(archive.archivedDateCreated.toDate().toString())}</TableCell>
                <TableCell align="center">{dateFormat(archive.archivedDateDeadline.toDate().toString())}</TableCell>
                <TableCell align="center">{dateFormat(archive.archivedCompleted.toDate().toString())}</TableCell>
                <TableCell align="center">{archive.archivedPriorityLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    )
}

export default withRouter(CompletedTasks)