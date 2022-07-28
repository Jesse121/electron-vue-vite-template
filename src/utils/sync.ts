interface BaseRes<T = any> {
	msg: string;
	result: T;
	info: string;
	status: boolean;
	[k: string]: any;
}

export default async function sync<T = Omit<BaseRes, "result">>(p: Promise<T>): Promise<[unknown, T?]> {
	try {
		const d = await p;
		return [null, d];
	} catch (err) {
		return [err];
	}
}
