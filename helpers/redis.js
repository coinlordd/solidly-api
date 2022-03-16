const redis = require("redis");

const redisOptions = {
  socket: {
    tls: process.env.NODE_ENV === "production",
    rejectUnauthorized: false,
  },
};

const client = redis.createClient(process.env.REDIS_URL, redisOptions);

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
