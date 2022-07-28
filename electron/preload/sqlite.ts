import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

export interface ISqlite {
	db: any;
	connect: (path: string) => Promise<unknown>;
	run: (sql: string, params: Object) => Promise<unknown>;
	all: (sql: string, params: Object) => Promise<unknown>;
}

class Sqlite implements ISqlite {
	static instance: any = null;
	db: any = null;

	// 连接数据库
	connect(path: string) {
		return new Promise((resolve, reject) => {
			this.db = new sqlite.Database(path, err => {
				if (err) {
					reject(err);
				} else {
					resolve(1);
				}
			});
		});
	}

	// 运行sql
	run(sql: string, params = {}) {
		return new Promise((resolve, reject) => {
			this.db.run(sql, params, err => {
				if (err) {
					reject(err);
				} else {
					resolve(1);
				}
			});
		});
	}

	// 运行多条sql
	exec(sql: string) {
		return new Promise((resolve, reject) => {
			this.db.exec(sql, err => {
				if (err) {
					reject(err);
				} else {
					resolve(1);
				}
			});
		});
	}

	// 查询一条数据
	get(sql: string, params = {}) {
		return new Promise((resolve, reject) => {
			this.db.get(sql, params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	// 查询所有数据
	all(sql: string, params = {}) {
		return new Promise((resolve, reject) => {
			this.db.all(sql, params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	// 关闭数据库
	close() {
		this.db.close();
	}

	// 单例
	static getInstance() {
		this.instance = this.instance ? this.instance : new Sqlite();
		return this.instance;
	}
}

export default Sqlite;
