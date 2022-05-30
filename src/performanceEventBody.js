import { EventBody } from './eventBody.js';

function ensureArray(value) {
	if (!Array.isArray(value)) {
		return [value];
	}
	return value;
}

export class PerformanceEventBody extends EventBody {
	constructor() {
		super(...arguments);
		super.setTypeGuid('02a00ca0-e67d-4a6c-908b-ee80b8a61eec');
	}

	addUserTiming(timing) {
		if (!this._userTiming) {
			this._userTiming = [];
		}
		this._userTiming.push(...ensureArray(timing));
		return this;
	}

	toJSON() {
		const json = super.toJSON();
		if (this._userTiming) {
			json.UserTiming = this._userTiming;
		}
		return json;
	}
}
