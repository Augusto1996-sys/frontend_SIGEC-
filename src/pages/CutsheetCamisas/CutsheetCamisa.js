import React, { useState, useEffect } from 'react';
import CutsheetCalsaForm from './CutsheetCamisaForm';
import PageHeader from '../../components/PageHeader'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/TableChart';
import { InputAdornment, InputLabel, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup'
import api from '../../services/api';
import * as cutsheetCamisasservices from '../../services/cutsheetCamisasservices'
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
    { id: 'pk_id_cutsheet', label: 'ID' },
    { id: 'codigo_cutsheet', label: 'Cutsheet' },
    { id: 'cod_tecido1', label: 'Fabric' },
    { id: 'tipo_peca', label: 'Item' },
    { id: 'quantidade_peca', label: 'Quantity Item' },
    { id: 'metragem_tecido', label: 'Fabric Qty' },
    { id: 'cod_intertela1', label: 'Intertela' },
    { id: 'tipo_etiqueta', label: 'Labels' },
    { id: 'cor', label: 'Color' },
    { id: 'cor', label: 'Pointer' },
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
            const res = await api.get('/cutsheetCamisa/listar_cutsheetCamisa');
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

    const addOrEdit = (employees, resetForm) => {
        if (employees.id_cutsheet == 0) {
            cutsheetCamisasservices.updatecutsheetCamisa(employees)
            
       
        } else {
           cutsheetCamisasservices.insertcutsheetCamisa(employees)
        }

        resetForm(); //Limpa o formulario
        setopenPopup(false); // Fecha o Modal    
        
        window.location.href = '/admin/usuario/cutsheetCamisamoztex'    
    }
    const handleSearch = e => {
        let target = e.target;
        setFiltterFn({
            fn: items => {
                if (target.value == "") {
                    return items
                }
                else {
                    return items.filter(x => x.codigo_cutsheet.toLowerCase().includes(target.value))
                }
            }
        })
    }
    const openInPopupEdit = item => { //Responsavel por Passar os dados a serem editados
        setrecordForEdit(item);
        setopenPopup(true);
    }

    const deleteUserByID = id => { //Responsavel por Passar o ID a ser deletados
        cutsheetCamisasservices.deletecutsheetCamisa(id)
    }
    return (
        <>
            <PageHeader
                tittle="Cutsheets Para Camisas"
                subtittle="Formulario com Validacao, para a adicao de novas cutsheets"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {/*<cutsheetCalsa    />*/}
                <Toolbar>
                    <Controls.Input
                        className={classes.SearchInput}
                        name="search"
                        label="Search User"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}

                    >

                    </Controls.Input>
                    <Controls.Button
                        text="Novo Cutsheet"
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
                            (<TableRow key={item.pk_id_cutsheet}>
                                <TableCell> {item.pk_id_cutsheet} </TableCell>
                                <TableCell> {item.codigo_cutsheet} </TableCell>
                                <TableCell> {item.cod_tecido1} </TableCell>
                                <TableCell> {item.especifidade_peca+" " +item.tipo_peca} </TableCell>
                                <TableCell> {item.quantidade_peca} </TableCell>
                                <TableCell> {item.metragem_tecido} </TableCell>
                                <TableCell> {item.cod_intertela1} </TableCell>
                                <TableCell> {item.tipo_etiqueta} </TableCell>
                                <TableCell> {item.cor} </TableCell>                                
                                <TableCell> {item.nome_funcionario} </TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                    >
                                        <EditIcon fontSize="small"
                                            onClick={() => openInPopupEdit(item)}
                                        />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                    >
                                        <DeleteIcon
                                            fontSize="small"
                                            onClick={() => deleteUserByID(item)}
                                        />
                                    </Controls.ActionButton>

                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <h href="usuario/admin">Cutsheet Calsas</h>
                <TblPaginition />

            </Paper>
            <Popup
                tittle="Blouser Cutsheet  Form"
                openPopup={openPopup}
                setOpenPopup={setopenPopup}
            >
                <CutsheetCalsaForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )

}