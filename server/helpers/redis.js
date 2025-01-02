const Redis = require('ioredis');
const config = require('../controllers/config');
const redisClient = new Redis({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    password: config.REDIS_PASSWORD
})

redisClient.on('connect', () => {
    console.log("Redis Connected!!");
})

module.exports = {
    redisClient
}