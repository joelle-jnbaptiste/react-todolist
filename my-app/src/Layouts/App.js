//Lorsqu'on veut créer un component on importe React
import React, { useContext } from 'react';
import List from '../components/List'
import Item from '../components/Item'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from "@material-ui/icons/Clear"
import CheckIcon from '@material-ui/icons/Check';
import { AppContext } from '../AppContext';

//On déclare un component sous forme d'arrow function
const App = () => {
  
 //Observe les changements apportés à la liste
  const {myList, myTab, changeTab,openAddList,openDeleteList} = useContext(AppContext)

    //update l'état des boutons du menu en fonction de leur etat (achevé/ en cour et onglet actif)
    const isFinished = (state, title, index) => {
        if (state === true) {
            if (index === myTab) {
                return <Button startIcon={<CheckIcon />} variant="contained" color="secondary" onClick={() => changeTab(index)}>{title}</Button>
            } else {
                return <Button startIcon={<CheckIcon />} variant="outlined" color="secondary" onClick={() => changeTab(index)}>{title}</Button>
            }
        }
        if (index === myTab) {
            return <Button startIcon={<ClearIcon />} variant="contained" color="secondary" onClick={() => changeTab(index)}>{title}</Button>
        }
        return <Button startIcon={<ClearIcon />} variant="outlined" color="secondary" onClick={() => changeTab(index)}>{title}</Button>
    }

    return (
            <div className='layout'>
                <div className='title'>
                    <h1>Ma 1ère To-Do liste sur React JS</h1>
                    <div className='tab-list'>
                        {myList.map(({ items, title, state }, index) => {
                            return isFinished(state, title, index)
                        })}
                    </div>
                    <div className='btn-grp'>
                        <Button variant="outlined" color="secondary" onClick={openAddList} startIcon={<EditIcon />} className={"btn-add"}>
                            Add
                        </Button>
                        {
                            <Button onClick={myList[myTab] ? openDeleteList : null} variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</Button>
                        }
                    </div>
                </div>
                <div className="main-container">
                    <div className='sub-container'>
                        {myList.map(({ items, title, state }, index) => {
                                if (myTab === index) {
                                    return <List title={title} key={index} state={state} index={index}>
                                        {items.map(({ title: itemTitle, description, state: itemState }, indexItem) => {
                                            return <Item title={itemTitle} description={description} itemState={itemState} listState={state} indexList={index} indexItem={indexItem}></Item>
                                        })}
                                    </List>
                                } else {
                                    return null
                                }
                            })
                        }
                    </div>
                </div>
            </div>
    )
}

export default App;
