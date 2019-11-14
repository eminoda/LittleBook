const Service = require('egg').Service;

class RedisService extends Service {
	async hashSet(key, field, value) {
		return this.app.redis.hset(key, field, value);
	}
	async hashGet(key, field) {
		return this.app.redis.hget(key, field);
	}
	async lpush(key, value) {
		return this.app.redis.lpush(key, value);
	}
	async setAdd(key, list) {
		return this.app.redis.sadd(key, ...list);
	}
	async setMembers(key) {
		return this.app.redis.smembers(key);
	}
	async set(key, value) {
		return this.app.redis.set(key, value, 'EX', 30);
	}
	async get(key) {
		let data = await this.app.redis.get(key);
		try {
			data = JSON.parse(data);
		} catch (err) {}
		return data;
	}
}

module.exports = RedisService;
