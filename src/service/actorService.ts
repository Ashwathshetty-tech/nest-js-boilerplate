import pool from '../config/postgres';
import { logger } from '../config/logger';
import { setRedisSession, getRedisSession } from '../helpers/redis';
import { Request, Response } from 'express';

export const fetchAllActors = async (req: Request, res?: Response) => {
  let { page, limit } = req.query as any;
  page = parseInt(page) || 1;     // Default Page: 1
  limit = parseInt(limit) || 10;  // Default Limit: 10
  const offset = (page - 1) * limit;
  
  const cacheKey = `actors_page_${page}_limit_${limit}`;

  try {
    // Check if data exists in Redis
    const cachedData: any = await getRedisSession(cacheKey);
    if (cachedData) {
      logger.info(`Cache hit for ${cacheKey}`);
      return cachedData;
    }

    // Fetch Data from DB
    const result = await pool.query(
      `SELECT * FROM actor ORDER BY actor_id LIMIT $1 OFFSET $2`, 
      [limit, offset]
    );

    const totalCount = await pool.query(`SELECT COUNT(*) FROM actor`);
    const totalRows = parseInt(totalCount.rows[0].count);

    const response = {
      page,
      limit,
      totalRows,
      totalPages: Math.ceil(totalRows / limit),
      data: result.rows,
    };

    // Cache Data in Redis
    await setRedisSession(cacheKey, response);

    logger.info(`Fetched Actors with Pagination - Page: ${page}, Limit: ${limit}`);
    return res ? res.json(response) : response;
  } catch (error: any) {
    logger.error(`Fetch Actors Failed: ${error.message}`);
    if (res) return res.status(500).json({ error: error.message });
    throw error;
  }
};

export const saveActor = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;
  try {
    const query = `INSERT INTO actor (first_name, last_name) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(query, [firstName, lastName]);
    const cacheKey =  result.rows[0].actor_id;
    await setRedisSession(cacheKey, result.rows[0]);
    logger.info(`Actor Created: ${firstName} ${lastName}`);
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    logger.error(`Create Actor Failed: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
