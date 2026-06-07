import { redisInstance } from '../config/redis';
import { sanitizeObj } from '../utils/common'

const redisClient: any = redisInstance.getClient();

export async function setRedisSession(key: string, value: any) {
  const _value = JSON.stringify(sanitizeObj(value));
  const result = await redisClient.set(key,_value);
  if(!result) return null;
  return JSON.parse(result);
}

export function setRedisSessionWithExipiry(key: string, value: any, expire: number) {
  return new Promise((resolve, reject) => {
    const _value = JSON.stringify(sanitizeObj(value));
    redisClient.set(key, _value, (err: any, response: any) => {
      if (err) return reject(err);
      redisClient.expire(key, parseInt(String(expire), 10));
      resolve(response);
    });
  });
}

export async function getRedisSession(key: string) {
  const result = await redisClient.get(key);
  if(!result) return null;
  return JSON.parse(result);
}

export function delRedisSession(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.del(key, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
}

export function setAttemptCount(key: string, expire: number) {
  redisClient.exists(key, (err: any, reply: any) => {
    if (reply === 1) redisClient.incr(key);
    else redisClient.set(key, 1);
    redisClient.expire(key, parseInt(String(expire), 10));
  });
}

export async function getAttemptCount(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err: any, reply: any) => {
      if (err) reject(err);
      return resolve(reply ? parseInt(reply, 10) : 0);
    });
  });
}

export async function checkMemberInSet(setName: string, value: string) {
  return new Promise((resolve, reject) => {
    redisClient.sismember(setName, value, (err: any, response: any) => {
      if (err) {
        return reject(err);
      }
      if (response === 0) {
        return resolve(false);
      }
      if (response === 1) {
        return resolve(true);
      }
    });
  });
}

export async function incrRedisSession(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.incr(key, (err: any, reply: any) => {
      if (err) reject(err);
      return resolve(reply ? parseInt(reply, 10) : 0);
    });
  });
}

export async function keyExist(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.exists(key, (err: any, reply: any) => {
      if (err) reject(err);
      return resolve(reply ? parseInt(reply, 10) : 0);
    });
  });
}

export async function setRateLimitCount(key: string, expire: number) {
  const exist: any = await keyExist(key);
  if (exist === 1) return incrRedisSession(key);
  await setRedisSessionWithExipiry(key, 1, expire);
  return 1;
}

export function setnxWithExpiry(key: string, value: any, expire: number) {
  return new Promise((resolve, reject) => {
    const _value = JSON.stringify(sanitizeObj(value));
    redisClient.set(key, _value, 'NX', 'EX', parseInt(String(expire), 10), (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
}
