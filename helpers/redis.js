const redis = require("redis");
const asyncRedis = require("async-redis");
const url = require("url");

const REDIS_URL = process.env.REDIS_URL;
const redis_uri = url.parse(REDIS_URL);

const redisOptions = REDIS_URL.includes("rediss://")
  ? {
      port: Number(redis_uri.port),
      host: redis_uri.hostname,
      password: redis_uri.auth.split(":")[1],
      db: 0,
      tls: {
        rejectUnauthorized: false,
      },
    }
  : REDIS_URL;

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
