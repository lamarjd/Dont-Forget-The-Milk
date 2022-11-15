import React from 'react'
import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session.js';
import { deleteListThunk, editListThunk } from "../../store/lists.js"

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

import { fetchLists } from "../../store/lists"

import ListForm from '../ListModal/ListForm.js';


export default function AllLists(){

    const dispatch = useDispatch()
    const listState = useSelector((state) => state.lists);

    const thisUser = useSelector((state) => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchLists())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const lists = Object.values(listState)
    console.log("lists", lists)

    return isLoaded && (
        <div className='lists'>
        

            <h1>Lists</h1>
            {/* <ListForm/> */}
            {lists.map(list => (
                <div key={list.id}>

                <NavLink className="detail-navlink" key={list.id} to={`/all/${list.id}`}> <h3>{list.name}</h3></NavLink>
                <button onClick={()=>dispatch(deleteListThunk(list.id))}> DELETE</button> 
                <button onClick={()=>dispatch(editListThunk(list.id))}>Edit</button>
                </div>
            ))}

        </div>
        
        )        
    }

