import { Request, Response } from 'express';
import knex from '../database/connection';


class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        //filtros cidade, uf, items (Query Params)

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json({points})
    }



    async show(request: Request, response: Response){
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point){
            return response.status(400).json({message: 'Point not found.'});
        }
        
        /**
         * SELECT * FROM items
         *  JOIN point_items ON items.id = point_items.item_id
         * WHERE point+items.point_id = { id }
         */

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
        
        return response.json({point, items});

    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        //const trx = await knex.transaction(); 
        //tirei pq tava bugando, era pra ser trx no lugar de knex nas linhas 77 e 88

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        const insertedIds = await knex('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return{
                item_id,
                point_id
            };
        })
    
        await knex('point_items').insert(pointItems);
    
        return response.json({ 
            id: point_id,
            ... point,
        });
    }
}

export default PointsController;