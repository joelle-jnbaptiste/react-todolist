import React, { createContext, useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'

export const AppContext = createContext({})

//On simmule un modèle de données (tableau de liste)
const lists = [
    {
        title: 'Ma 1er Liste',
        state: false,
        items: [
            {
                title: 'item1',
                description: 'blah blaha',
                state: false
            },
            {
                title: 'item2',
                description: 'blah blaha',
                state: false
            },
            {
                title: 'item3',
                description: 'blah blaha',
                state: false
            },
        ]
    }]

const AppContextProvider = ({ children }) => {

    //déclaration des variables qui seront amenées a etre modifiée
    const [myList, setMyList] = useState(lists)
    const [myTab, setMyTab] = useState(0)
    const [myItemIndex, setMyItemIndex] = useState(0)
    const [myListTitle, setMyListTitle] = useState('New List ' + myList.length)
    const [myItemTitle, setMyItemTitle] = useState('')
    const [myItemDescription, setMyItemDescription] = useState('')

    //SAUVEGARDE ET CHARGEMENT
    //charge la liste présente dans le local storage si elle existe
    useEffect(() => {
        let loadedList = JSON.parse(localStorage.getItem('list'))
        if (loadedList !== undefined && loadedList !== null) {
            setMyList(loadedList)
        }
    }, [])
    //sauvegarde la liste dans le local storage à chaque modification sur la liste
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(myList))
    }, [myList])


    //GESTION DES INDEX DU TABLEAU
    //recupère la valeur de l'index de l'item actuellement sélectionné
    const changeItemIndex = (index) => {
        setMyItemIndex(index)
    }
    //recupère la valeur de l'index de la liste actuellement sélectionné
    const changeTab = (index) => {
        setMyTab(index)
    }
    //OBSERVABLES SUR LES INPUTS
    //recupère le titre de la liste
    const changeMyListTitle = (event) => {
        setMyListTitle(event.target.value)
    }
    //recupère le titre de l'item
    const changeMyItemTitle = (event) => {
        setMyItemTitle(event.target.value)
    }
    //recupère la description de l'item
    const changeMyItemDescription = (event) => {
        setMyItemDescription(event.target.value)
    }

    //GESTION DU TABLEAU
    //mets à jour la progression (achevée/inachevée) d'une liste
    const changeList = (index, dataFromChild) => {
        myList[index].state = dataFromChild;
        setMyList(myList.map(list => list))
        //mets à jour les items de la liste en fonction de l'etat la liste
        myList[index].items.forEach(item => {
            item.state = dataFromChild
        })
        setMyList(myList.map(list => list))
    }

    //mets à jour la progression (achevée/inachevée) d'un item
    const changeListItem = (indexList, indexItem, dataFromChild) => {
        myList[indexList].items[indexItem].state = dataFromChild;
        setMyList(myList.map(list => list))
        //vérifie si toutes les items de la liste sont achevés, si c'est le cas, la liste passe aussi au statut achevé
        let isStateAllTrue = true;
        myList[indexList].items.forEach(item => {
            if (item.state !== true) {
                isStateAllTrue = false
            }
        })
        myList[indexList].state = isStateAllTrue;
        setMyList(myList.map(list => list))
    }

    //Supprime la liste sélectionnée
    const deleteListEntry = () => {
        myList.splice(myTab, 1)
        setMyList(myList.map(list => list))
        setMyTab(0)
    }

    //Supprime l'item sélectionnée
    const deleteItemEntry = () => {
        myList[myTab].items.splice(myItemIndex, 1)
        setMyItemIndex(0)
        setMyList(myList.map(list => list))
    }

    //ajoute une liste dans le tableau
    const addListEntry = () => {
        const nouvelleListe = {
            title: '',
            state: false,
            items: []
        }
        nouvelleListe.title = myListTitle
        myList.push(nouvelleListe)
        setMyList(myList.map(list => list))
        setMyTab(0)
        setMyListTitle('New List ' + myList.length)
    }

    //ajoute un item dans la liste sélectionnée
    const addItemEntry = () => {
        const nouvelItem = {
            title: '',
            state: false,
            description: ''
        }
        nouvelItem.title = myItemTitle
        nouvelItem.description = myItemDescription
        myList[myTab].items.push(nouvelItem)
        setMyList(myList.map(list => list))
        setMyTab(0)
        setMyItemTitle('')
        setMyItemDescription('')
    }

    //GESTION DES POPUPS
    //Gestion de la popup de suppression de liste
    const [openDialogDeleteList, setOpenDeleteList] = React.useState(false);
    //ouvre la popup de suppression de liste
    const openDeleteList = () => {
        setOpenDeleteList(true);
    };
    //ferme la popup de suppression de liste
    const closeDeleteList = () => {
        setOpenDeleteList(false);
    };
    //Supprime la liste selectionnée lorsqu'on valide
    const deleteList = () => {
        deleteListEntry()
        closeDeleteList()
    }

    //Gestion de la popup de suppression d'item
    const [openDialogDeleteItem, setOpenDeleteItem] = React.useState(false);
    //ouvre la popup de suppression d'item
    const openDeleteItem = () => {
        setOpenDeleteItem(true);
    };
    //ferme la popup de suppression d'item
    const closeDeleteItem = () => {
        setOpenDeleteItem(false);
    };
    //Supprime l'item selectionné dans la liste en cours lorsqu'on valide
    const deleteItem = () => {
        deleteItemEntry()
        closeDeleteItem()
    }

    //Gestion de la popup ajout de liste
    const [openDialogAddList, setOpenAddList] = React.useState(false);
    //ouvre la popup d'ajout de liste
    const openAddList = () => {
        setOpenAddList(true);
    };
    //ferme la popup d'ajout de liste
    const closeAddList = () => {
        setOpenAddList(false);
    };
    //Ajoute une nouvelle liste au click sur le bouton
    const addList = () => {
        addListEntry()
        closeAddList()
    }

    //Gestion de la popup ajout d'item
    const [openDialogAddItem, setOpenAddItem] = React.useState(false);
     //ouvre la popup d'ajout d'item
    const openAddItem = () => {
        setOpenAddItem(true);
    };
    //ferme la popup d'ajout d'item
    const closeAddItem = () => {
        setOpenAddItem(false);
    };
    //Ajoute un nouvel item au click sur le bouton
    const addItem = () => {
        addItemEntry()
        closeAddItem()
    }

    const value = {
        myList,
        myTab,
        setMyList,
        myListTitle,
        setMyTab,
        changeList,
        changeTab,
        changeListItem,
        deleteListEntry,
        addListEntry,
        setMyListTitle,
        changeMyListTitle,
        openAddList,
        openDeleteList,
        openAddItem,
        changeItemIndex,
        openDeleteItem
    }

    return (
        <AppContext.Provider value={value}>
            {children}
            {/* Popin supression liste */}
            <Dialog open={openDialogDeleteList} onClose={closeDeleteList} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this list?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to delete this list: {myList[myTab].title ? myList[myTab].title : 'pas de liste à supprimer'}. Are you sure you want to delete it?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteList} color="primary" variant="outlined">Yes</Button>
                    <Button onClick={closeDeleteList} color="secondary" variant="contained" autoFocus>No</Button>
                </DialogActions>
            </Dialog>
            {/* Popin ajout liste */}
            <Dialog open={openDialogAddList} onClose={closeAddList} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Add a new list!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to add a new list! Choose a name for your list:
                    </DialogContentText>
                    <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Your list name:</InputLabel>
                        <Input value={myListTitle} onChange={changeMyListTitle} inputProps={{ maxLength: 15, }} id="list-name" startAdornment={
                            <InputAdornment position="start">
                                <EditIcon />
                            </InputAdornment>} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addList} color="primary" variant="outlined">Add a new List</Button>
                    <Button onClick={closeAddList} color="secondary" variant="contained" autoFocus>Cancel</Button>
                </DialogActions>
            </Dialog>
            {/* Popin ajout item */}
            <Dialog open={openDialogAddItem} onClose={closeAddItem} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Add a new item!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to add a new item! Choose a name and description for your item:
                    </DialogContentText>
                    <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Your item name:</InputLabel>
                        <Input value={myItemTitle} onChange={changeMyItemTitle} inputProps={{ maxLength: 15, }} id="item-name" startAdornment={
                            <InputAdornment position="start">
                                <EditIcon />
                            </InputAdornment>} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Your item description:</InputLabel>
                        <Input value={myItemDescription} onChange={changeMyItemDescription} id="description-name" startAdornment={
                            <InputAdornment position="start">
                                <EditIcon />
                            </InputAdornment>} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addItem} color="primary" variant="outlined">Add a new Item</Button>
                    <Button onClick={closeAddItem} color="secondary" variant="contained" autoFocus>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Popin suppression item */}
            <Dialog open={openDialogDeleteItem} onClose={closeDeleteItem} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this Item?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteItem} color="primary" variant="outlined">Yes</Button>
                    <Button onClick={closeDeleteItem} color="secondary" variant="contained" autoFocus>No</Button>
                </DialogActions>
            </Dialog>
        </AppContext.Provider>
    )
}

export default AppContextProvider