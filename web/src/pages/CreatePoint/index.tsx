import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import api from '../../services/api';


import './styles.css';

import logo from '../../assets/logo.svg';

//array ou objeto: manualmente informar o tipo da variavel

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
            console.log(response)
        });
    }, []);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to ='/'>
                    <FiArrowLeft/>
                    Voltar para home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br/> ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name"/>
                        
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Nome da entidade</label>
                            <input type="email" name="email" id="email"/>
                            
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="text" name="whatsapp" id="whatsapp"/>
                            
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <MapContainer center={[-12.9986584,-38.4744777]} zoom={15}>
                        <TileLayer 
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[-12.9986584,-38.4744777]} />
                    </MapContainer>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf">
                                <option value="0">Seleciona uma UF</option>
                            </select>
                            
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Seleciona uma cidade</option>
                            </select>
                            
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    
                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="teeste"/>
                            <span>a</span>
                        </li>   
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastro ponto de coleta
                </button>
            </form>
        </div>
    )
};

export default CreatePoint;