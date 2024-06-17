import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class UtilsService {
	private readonly SALT_WORK_FACTOR: number;
	constructor() {
		this.SALT_WORK_FACTOR = 10;
	}

	/**
	 * Generate hash password with bcrypt
	 * @returns {string} password hashed
	 */
	hashPassword(_password: string) {
		const test = bcrypt.hash(_password, this.SALT_WORK_FACTOR);
		return test;
	}

	phoneFormat(_number: string) {
		if (_number) _number = _number.toString().replace('+84', '');
		return (+_number).toString();
	}

	/**
	 * Verifies if property exists and returns value.
	 *
	 * Usage: getProp({a: { b: { c: 1 }}, 'a.b.c') => 1
	 *
	 * @param {object} o
	 * @param {string} props object path
	 * @param {*} defaultValue value returned if property does not exist
	 *
	 * @returns the value o
	 */
	getProp = (o: object, props: string, defaultValue: any) =>
		props
			? props
					.split('.')
					.reduce(
						(a: any, b: any) =>
							a && typeof a[b] !== 'undefined' ? a[b] : defaultValue,
						o,
					)
			: defaultValue;

	/**
	 * Generate the unique id
	 * @returns {string} a unique id
	 */
	generateUUId() {
		const currentTime: number = new Date().getTime();
		const randomString: any = randomUUID().split('-').pop();
		const uuid = randomString + currentTime;
		return uuid;
	}

	/**
	 * Measure the Performance of a Function
	 * @param {*} name — The name of the label is displayed in the console.
	 * @param {*} fn - The function you want to measure the performance of
	 * @param {*} args - The arguments for the function you’re calling
	 * @returns {string} time fuction took to execute
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	measurePerformance(name: string, fn: Function, ...args: any) {
		if (typeof fn !== 'function') {
			console.error(`Provide a valid function, ${typeof fn} provided`);
			return;
		}
		console.time(name);
		fn.bind(this, ...args);
		console.timeEnd(name);
	}
}
