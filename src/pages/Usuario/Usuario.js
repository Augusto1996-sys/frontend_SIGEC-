import React, { useState, useEffect } from 'react';
import UsuarioForm from './UsuarioForm';
import PageHeader from '../../components/PageHeader'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { InputAdornment, InputLabel, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup'
import api from '../../services/api';
import * as usuariosercices from '../../services/usuarioservices'
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(3)

    },
    SearchInput: {
        width: '75%'

    }, newButton: {
        position: 'absolute',
        right: '10px'
    }
}))
const headersCells = [
    { id: 'pk_id_usuarioc', label: 'ID' },     
    { id: 'fullname', label: 'Name' },   
    { id: 'email', label: 'Email' },
    { id: 'nivel', label: 'User Type' },
    { id: 'state', label: 'State' },
    { id: 'actions', label: 'Actions', desableSorting: true },
]
export default function User() {
    const classes = useStyles()
    const [recordForEdit, setrecordForEdit] = useState([]);
    const [filtterFn, setFiltterFn] = useState({ fn: items => { return items } });
    const [openPopup, setopenPopup] = useState(false);
    const [usuarios, setUsuarios] = useState([]); //vindo da BD
    //const histry =  useHistory();
    const [records, setRecords] = useState(null);

    useEffect(() => {
        async function loadUsuarios() {
            const res = await api.get('/usuario/listar_usuario');
            setUsuarios(res.data)
        }
        loadUsuarios();
    }, [])

    useEffect(() => {
        if (usuarios?.length > 0) {
            setRecords(usuarios)
        }

    }, [usuarios])


    const {
        TblContainer,
        TblHead,
        TblPaginition,
        recordsAfterPagingAndSorting
    } = useTable(records?.length > 0 && records, headersCells, filtterFn)

    const addOrEdit = (usuario, resetForm) => {

        if (usuario.pk_id_usuarioc > 0) {

            usuariosercices.updateusuario(usuario)

        } else {

            usuariosercices.insertusuario(usuario)
        }
        resetForm(); //Limpa o formulario
        setopenPopup(false); // Fecha o Modal        
        window.location.href = '/admin/usuario/usuarioMoztex'
    }
    const handleSearch = e => {
        let target = e.target;
        setFiltterFn({
            fn: items => {
                if (target.value == "") {
                    return items
                }
                else {
                    return items.filter(x => x.fullname.toLowerCase().includes(target.value))
                }
            }
        })
    }
    const openInPopupEdit = item => { //Responsavel por Passar os dados a serem editados
        setrecordForEdit(item);
        setopenPopup(true);
    }

    const deleteUserByID = id => { //Responsavel por Passar o ID a ser deletados
        usuariosercices.deleteUser(id)
    }
    return (
        <>
            <PageHeader
                tittle="Usuario MOZETEX"
                subtittle="Formulario com Validacao, para a adicao de novas Usuarios do Sistema. Pode Procurar os Funcionarios pelos seus Nomes com letras minusculas"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {/*<UsuarioForm    />*/}
                <Toolbar>
                    <Controls.Input
                        className={classes.SearchInput}
                        name="search"
                        label="Buscar Usuarios pelo Nome"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}

                    >

                    </Controls.Input>
                    <Controls.Button
                        text="Adicinar Novo"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => setopenPopup(true)}
                    >
                    </Controls.Button>
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting()?.map(item =>
                            (<TableRow key={item.pk_id_usuarioc}>
                                <TableCell> {item.pk_id_usuarioc} </TableCell>
                                <TableCell> {item.fullname} </TableCell>                                
                                <TableCell> {item.email} </TableCell>
                                <TableCell> {item.nivel} </TableCell>
                                <TableCell> {item.state} </TableCell>
                                <TableCell>

                                    <Controls.ActionButton
                                        color="primary"
                                    >
                                        <EditIcon fontSize="small"
                                            onClick={() => openInPopupEdit(item)}
                                        />Editar
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                    >
                                        <DeleteIcon
                                            fontSize="small"
                                            onClick={() => deleteUserByID(item)}
                                        />Apagar
                                    </Controls.ActionButton>

                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPaginition />
            </Paper>
            <Popup
                tittle="Formulario de Cadastro de Usarios"
                openPopup={openPopup}
                setOpenPopup={setopenPopup}
            >
                <UsuarioForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )

}