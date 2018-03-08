import {EventBody} from './eventBody';

export class ProblemEventBody extends EventBody {
	constructor() {
		super(...arguments);
		super.setTypeGuid('96a02080-a363-4524-b231-563e55aa0d47');
	}

	setProblemType(type) {
		this._problemType = type;
		return this;
	}

	toJSON() {
		const json = super.toJSON();
		if (this._problemType) {
			json.Problem = {
				problemType: this._problemType
			};
		}
		return json;
	}
}
