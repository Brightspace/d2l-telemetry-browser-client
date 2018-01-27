export class Event {
	constructor() {
	}

	setType(type) {
		this._eventType = type;
		return this;
	}

	setSourceId(sourceId) {
		this._sourceId = sourceId;
		return this;
	}

	setDate(date) {
		this._date = date;
		return this;
	}

	setBody(body) {
		this._eventBody = body;
		return this;
	}

	toJSON() {
		const json = {};
		json.EventType = this._eventType;
		json.SourceId = this._sourceId;
		if (this._date) {
			json.Date = this._date.toISOString();
		}
		json.EventBody = this._eventBody.toJSON();

		// Temporary hack to make these events work with the old telemetry system
		json.name = json.EventBody.Action;
		json.ts = (Date.now() / 1000) | 0;

		return json;
	}

}
