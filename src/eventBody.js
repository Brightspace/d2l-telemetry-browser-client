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

	setTenantUrl(tenantUrl) {
		this._tenantUrl = tenantUrl;
		return this;
	}

	setContext(id, type, url, value) {
		this._context = {};

		if (id) {
			this._context.Id = id.toString();
		}
		if (type) {
			this._context.Type = type;
		}
		if (url) {
			this._context.Url = url;
		}
		if (value) {
			this._context.Value = value;
		}
		return this;
	}

	setObject(id, type, url, value) {
		this._object = {};

		if (id) {
			this._object.Id = id.toString();
		}
		if (type) {
			this._object.Type = type;
		}
		if (url) {
			this._object.Url = url;
		}
		if (value) {
			this._object.Value = value;
		}
		return this;
	}

	setTarget(id, type, url, value) {
		this._target = {};

		if (id) {
			this._target.Id = id.toString();
		}
		if (type) {
			this._target.Type = type;
		}
		if (url) {
			this._target.Url = url;
		}
		if (value) {
			this._target.Value = value;
		}
		return this;
	}

	setActivity(id, type) {
		this._activity = {};

		if (id) {
			this._activity.Id = id.toString();
		}
		if (type) {
			this._activity.Type = type;
		}
		return this;
	}

	setActor(role, requestId, sessionId, cookieId) {
		this._actor = {};

		if (role) {
			this._actor.ImsRoleIds = role;
		}
		if (requestId) {
			this._actor.RequestId = requestId;
		}
		if (sessionId) {
			this._actor.SessionId = sessionId;
		}
		if (cookieId) {
			this._actor.CookieId = cookieId;
		}
		return this;
	}

	addActorImsRole(role) {
		if (!this._actor) {
			this._actor = {};
		}
		if (!this._actor.ImsRoleIds) {
			this._actor.ImsRoleIds = [];
		}
		this._actor.ImsRoleIds.push(role);
		return this;
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

	setCustomJson(value) {
		this._customJson = value;
		return this;
	}

	toJSON() {
		const json = {};
		json.EventTypeGuid = this._eventTypeGuid;
		json.Action = this._action;
		json.TenantUrl = this._tenantUrl;
		if (this._date) {
			json.Date = this._date.toISOString();
		}
		if (this._context) {
			json.Context = this._context;
		}
		if (this._activity) {
			json.Activity = this._activity;
		}
		if (this._object) {
			json.Object = this._object;
		}
		if (this._target) {
			json.Target = this._target;
		}
		if (this._actor) {
			json.Actor = this._actor;
		}
		if (this._custom) {
			json.Custom = this._custom;
		}
		if (this._customJson) {
			json.CustomJson = this._customJson;
		}
		return json;
	}
}
