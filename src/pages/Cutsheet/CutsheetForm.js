import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as cutsheetservices from '../../services/cutsheetservices'
import api from '../../services/api';
import logosistema from '../../assets/img/Rh.jpg'

const stateChoice = [
    { id: "masculino", tittle: "Masculino" },
    { id: "femenino", tittle: "Femenino" },
    { id: "outros", tittle: "Outros" }
]

const initialFormValues = {
    pk_id_cutsheet: 0,

    codigo_cutsheet: '',
    metragem_tecido: '',
    cod_tecido1: '',
    cod_tecido2: '',
    cod_tecido3: '',


    metragem_intertela: '',
    cod_intertela1: '',
    cod_intertela2: '',
    metragem_bolso: '',
    cod_bolso1: '',
    cod_bolso2: '',////mhjjh


    tipo_peca: '',
    quantidade_peca: '', //Comeca daqui  
    tipo_etiqueta: '',
    style: '',
    nr_cortes: '',
    cor: '',

    butao: '',
    empacotamento: '',
    quant_zipper: '',
    hook_bar: '',
    sticker_tipo: '',
    cod_cones: '',
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const [usuarios, setUsuarios] = useState([]); //vindo da BD
    //const histry =  useHistory();
    const [records, setRecords] = useState(null);
    const histry = useHistory();


    useEffect(() => {
        async function loadUsuarios() {
            const res = await api.post('/cutsheet/Listar_cutsheet');
            //setUsuarios(res.data)
        }
        loadUsuarios();
    }, [])

    useEffect(() => {
        if (usuarios?.length > 0) {
            setRecords(usuarios)
        }

    }, [usuarios])

    const validate = (fieldvalues = values) =>{
        //Validacao dos Campos de texto em tempo real
        let temp = {...errors}
        if('fullname' in fieldvalues){         
               temp.fullname = fieldvalues.fullname?"":"This Field is Required"
        }
        if('codigo_cutsheet' in fieldvalues){         
               temp.codigo_cutsheet = fieldvalues.codigo_cutsheet.length>9?"":"Minimo de 5 Caracteres"
        }
        if('departamentId' in fieldvalues){         
               temp.departamentId = fieldvalues.departamentId.length!=0?"":"This Field is Required"
        }
        setErrors({
            ...temp
        })
   /// O Values retorna a colecao que sta armazenada na variavel TEMP
       if(fieldvalues == values)
        return Object.values(temp).every(x => x == "")
    }
    //Chamando Tudo que declaramos no UseForm
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFormValues, true, validate);


    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm)

        }
    }




    useEffect(() => {
        if (recordForEdit != null) {
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6} >
                    <Controls.Input
                        label="Codigo cutsheet"
                        name="codigo_cutsheet"
                        type="number"
                        value={values.codigo_cutsheet}
                        onChange={handleInputChange}
                        error={errors.codigo_cutsheet}
                    />
                    <Controls.Input
                        label="Metragem Total de Tecido"
                        name="metragem_tecido"
                        type="number"
                        value={values.metragem_tecido}
                        onChange={handleInputChange}
                        error={errors.metragem_tecido}
                    />
                    <Controls.Input
                        label="Codigo Principal de Tecido"
                        name="cod_tecido1"
                        type="number"
                        value={values.cod_tecido1}
                        onChange={handleInputChange}
                        error={errors.cod_tecido1}
                    />
                    <Controls.Input
                        label="Codigo Secundario de Tecido"
                        name="cod_tecido2"
                        type="number"
                        value={values.cod_tecido2}
                        onChange={handleInputChange}
                        error={errors.cod_tecido2}
                    />
                    <Controls.Input
                        label="Codigo Terciario de Tecido"
                        name="cod_tecido3"
                        type="number"
                        value={values.cod_tecido3}
                        onChange={handleInputChange}
                        error={errors.cod_tecido3}
                    />

                </Grid>

                <Grid item xs={6} >
                    <Controls.Input
                        label="Tipo de Artigo"
                        name="tipo_peca"
                        type="text"
                        value={values.tipo_peca}
                        onChange={handleInputChange}
                        error={errors.tipo_peca}
                    />
                    <Controls.Input
                        label="Quantidade Total de Pecas"
                        name="quantidade_peca"
                        type="number"
                        value={values.quantidade_peca}
                        onChange={handleInputChange}
                        error={errors.quantidade_peca}
                    />
                    <Controls.Input
                        label="Tipo de Etiqueta"
                        name="tipo_etiqueta"
                        type="text"
                        value={values.tipo_etiqueta}
                        onChange={handleInputChange}
                        error={errors.tipo_etiqueta}
                    />
                    <Controls.Input
                        label="Style"
                        name="style"
                        type="text"
                        value={values.style}
                        onChange={handleInputChange}
                        error={errors.style}
                    />
                </Grid>
                <Grid item xs={6} >
                    <Controls.Input
                        label="Botao"
                        name="butao"
                        type="text"
                        value={values.butao}
                        onChange={handleInputChange}
                        error={errors.butao}
                    />
                    <Controls.Input
                        label="Empacotamento"
                        name="empacotamento"
                        type="text"
                        value={values.empacotamento}
                        onChange={handleInputChange}
                        error={errors.empacotamento}
                    />
                    
                    <Controls.Input
                        label="Cor do Artigo"
                        name="cor"
                        type="text"
                        value={values.cor}
                        onChange={handleInputChange}
                        error={errors.cor}
                    />
                </Grid>
                <Grid item xs={6} >
                    <Controls.Input
                        label="Metragem Total de Intertela"
                        name="metragem_intertela"
                        type="number"
                        value={values.metragem_intertela}
                        onChange={handleInputChange}
                        error={errors.metragem_intertela}
                    />
                    <Controls.Input
                        label="Codigo Principal de Intertela"
                        name="cod_intertela1"
                        type="number"
                        value={values.cod_intertela1}
                        onChange={handleInputChange}
                        error={errors.cod_intertela1}
                    />
                    <Controls.Input
                        label="Codigo Principal de Secundaria"
                        name="cod_intertela2"
                        type="number"
                        value={values.cod_intertela2}
                        onChange={handleInputChange}
                        error={errors.cod_intertela2}
                    />
                    <Controls.Input
                        label="Metragem Total de Bolso"
                        name="metragem_bolso"
                        type="number"
                        value={values.metragem_bolso}
                        onChange={handleInputChange}
                        error={errors.metragem_bolso}
                    />
                    <Controls.Input
                        label="Codigo Principal de Bolso"
                        name="cod_bolso1"
                        type="number"
                        value={values.cod_bolso1}
                        onChange={handleInputChange}
                        error={errors.cod_bolso1}
                    /><Controls.Input
                        label="Codigo Secundario de Bolso"
                        name="cod_bolso2"
                        type="text"
                        value={values.cod_bolso2}
                        onChange={handleInputChange}
                        error={errors.cod_bolso2}
                    />

                </Grid>








                <Grid item xs={6} >

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                        />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                        />

                    </div>

                </Grid>

            </Grid>

        </Form >
    )
}


