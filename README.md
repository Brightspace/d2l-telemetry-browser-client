# d2l-telemetry-browser-client

UI Client for sending telemetry from the browser to a telemetry service.

The purpose of this library is to make it easier to construct telemetry events matching the standardized schema (Standard Events) for generating product telemetry as defined in the links below and then to send the events to the [`Product Telemetry Service`](https://github.com/Brightspace/d2l-telemetry-service).

[`Base schema for UI Telemetry Events`](https://github.com/Brightspace/schema/blob/master/src/events/ui-telemetry-event/ui-telemetry-event-base.json)

[`UI Telemetry Event Schema`](https://github.com/Brightspace/schema/blob/master/src/events/ui-telemetry-event/ui-telemetry-event.json)
[`Example UI Telemetry Event`](https://github.com/Brightspace/schema/blob/master/test/events/ui-telemetry-event/ui-telemetry-event.js)

[`UI Performance Event Schema`](https://github.com/Brightspace/schema/blob/master/src/events/ui-performance-event/ui-performance-event.json)
[`Example UI Performance Event`](https://github.com/Brightspace/schema/blob/master/test/events/ui-performance-event/ui-performance-event.js)

[`UI Problem Event Schema`](https://github.com/Brightspace/schema/blob/master/src/events/ui-problem-event/ui-problem-event.json)
[`Example UI Problem Event`](https://github.com/Brightspace/schema/blob/master/test/events/ui-problem-event/ui-problem-event.js)

As an experiment, there is also a JSON-LD context for defining terms used in TelemetryEvents. This is
an exercise to see if there is value in trying to adopt a common vocabulary. The context is modelled after the IMS Caliper context. Note: JSON-LD is not currently used by any component in the event
processing system, so this is purely documentary at this point.
[`Experimental Vocabulary`](https://github.com/Brightspace/schema/blob/master/context/context.json)

Note: Some properties defined by the telemetry event schema will be set by the backend service when it handles the event.
These include: `Version`, `EventId`, `Timestamp`, `TenantId`, `EventBody.Timestamp`, `EventBody.Actor.Id`, `EventBody.TenantUrl`, `EventBody.Browser`.

## Usage

### Setup

Install `d2l-telemetry-browser-client` via NPM:

```shell
npm install d2l-telemetry-browser-client
```

#### NPM

In NPM, require it normally:

```javascript
const d2lTelemetryBrowserClient = require('d2l-telemetry-browser-client');
```

#### ES6

In ES6, use an `import` statement:

```javascript
import d2lTelemetryBrowserClient from 'd2l-telemetry-browser-client';
```

The client uses [`d2l-fetch`](https://github.com/Brightspace/d2l-fetch) for making the API requests to the telemetry service.
See the [`d2l-fetch browser compatibility`](https://github.com/Brightspace/d2l-fetch#browser-compatibility) instructions for additional requirements.

### Use

```js

const client = new d2lTelemetryBrowserClient.Client({
  endpoint
});

const id = 'http://prd.activityfeed.us-east-1.brightspace.com/api/v1/d2l:orgUnit:6614/article/da1e037d-6a51-4d1a-ba3d-fa62fb5e3591';

// EventBody.Object.Id is currently restricted to simple types which do not include ':' characters
// by current BDP processing. Even though these events are not yet going to BDP, suggestion
// is to either use an internal identifier or encode the URL.
// The URL is included as a new EventBody.Object.Url property.
const eventBody = new d2lTelemetryBrowserClient.EventBody()
  .setAction('Created')
  .setObject(encodeURIComponent(id), 'Article', id);

const event = new d2lTelemetryBrowserClient.TelemetryEvent()
  .setDate(new Date())
  .setType('TelemetryEvent')
  .setSourceId('activityfeed')
  .setBody(eventBody);

client.logUserEvent(event);

```

## Development

### Setup

```shell
npm install
npm run test
```

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`. Read on for more details...

The [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)
* Deploy a new package to NPM

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)
