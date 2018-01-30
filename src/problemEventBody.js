import {EventBody} from './eventBody';

export class ProblemEventBody extends EventBody {
	constructor() {
		super(...arguments);
		super.setTypeGuid('96a02080-a363-4524-b231-563e55aa0d47');
	}

	setProblemType(type) {
		this._type = type;
		return this;
	}

	toJSON() {
		const json = super.toJSON();
		if (this._type) {
			json.Problem = {
				Type: this._type
			};
		}
		return json;
	}
}
