import React, { useContext } from 'react'
import { useState } from 'react'
import { FormControl, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import { AppContext } from '../AppContext'
import DeleteIcon from '@material-ui/icons/Delete'


const Item = ({ title, description, itemState, listState, indexItem, indexList }) => {

    const { changeListItem, changeItemIndex, openDeleteItem } = useContext(AppContext)
    const [done, toggleDone] = useState(itemState)

    const toogleCheck = () => {
        if (done === true)
            toggleDone(false)
        else
            toggleDone(true)
        changeListItem(indexList, indexItem, !done);
    }

    const deleteItemEntry = () => {
        changeItemIndex(indexItem)
        console.log(indexItem)
        openDeleteItem()
    }

    let itemDoneClassName = itemState === true ? 'item item-done' : 'item'
    return (
        <div className={itemDoneClassName}>
            <FormControl component="fieldset">
                <FormControlLabel value="start" label={title} control={
                    <Checkbox color="secondary" checked={itemState} onChange={toogleCheck} />
                }/>
            </FormControl>
            <div className='item-content'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <Button onClick={deleteItemEntry} variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</Button>
        </div>
    )
}


export default Item
