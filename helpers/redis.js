const redis = require("redis");

const redisOptions =
  process.env.NODE_ENV === "production"
    ? {
        url: process.env.REDIS_TLS_URL,
        socket: {
          tls: true,
          rejectUnauthorized: false,
        },
      }
    : process.env.REDIS_URL;

const client = redis.createClient(redisOptions);

client.connect();

client.on("error", (error) => {
  console.error("Redis error encountered: ", error);
});

client.on("connect", () => {
  console.log("Redis connection established");
});

module.exports = {
  RedisClient: client,
};
