export class EventBody {
	constructor() {
		this._eventTypeGuid = 'd6b021b6-ffa2-4ee8-8206-8710e04396ce';
	}

	setTypeGuid(guid) {
		this._eventTypeGuid = guid;
		return this;
	}

	setDate(date) {
		this._date = date;
		return this;
	}

	setAction(action) {
		this._action = action;
		return this;
	}

	setContext(id, type) {
		this._context = {
			Id: id,
			Type: type
		};
		return this;
	}

	setObject(id, type) {
		this._object = {
			Id: id,
			Type: type
		};
		return this;
	}

	addActorImsRole(role) {
		if (!this._actor) {
			this._actor = {};
		}
		if (!this._actor.imsRolesIds) {
			this._actor.ImsRoleIds = [];
		}
		this._actor.ImsRoleIds.push(role);
	}

	addCustom(name, value) {
		if (!this._custom) {
			this._custom = [];
		}
		this._custom.push({
			name: name.toString(),
			value: value.toString()
		});
		return this;
	}

	toJSON() {
		const json = {};
		json.EventTypeGuid = this._eventTypeGuid;
		json.Action = this._action;
		if (this._date) {
			json.Date = this._date.toISOString();
		}
		if (this._context) {
			json.Context = this._context;
		}
		if (this._object) {
			json.Object = this._object;
		}
		if (this._actor) {
			json.Actor = this._actor;
		}
		if (this._custom) {
			json.Custom = this._custom;
		}
		return json;
	}
}
