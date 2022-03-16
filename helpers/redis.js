const redis = require("redis");
const asyncRedis = require("async-redis");

const redisOptions = {
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
};

const client = redis.createClient(redisOptions);

client.connect();

client.on("error", (error) => {
  console.error("Redis error encountered: ", error);
});

client.on("connect", () => {
  console.log("Redis connection established");
});

module.exports = {
  RedisClient: asyncRedis.decorate(client),
};
