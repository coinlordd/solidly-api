const redis = require("redis");
const asyncRedis = require("async-redis");

let config =
  process.env.NODE_ENV === "production" && process.env.REDIS_URL
    ? {
        url: process.env.REDIS_URL,
        socket: {
          tls: true,
          rejectUnauthorized: false,
        },
      }
    : null;

const client = redis.createClient(config);

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
