# d2l-telemetry-browser-client
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependencies-image]][dependencies-url]

UI Client for sending telemetry from the browser to a telemetry service.

The purpose of this library is to make it easier to construct telemetry events matching the standardized schema (Standard Events) for generating product telemetry as defined in the links below and then to send the events to the [`Product Telemetry Service`](https://github.com/Brightspace/d2l-telemetry-service).

[`Base schema for UI Telemetry Events`](https://github.com/Brightspace/schema/blob/master/events/ui-telemetry-event-base.json)

[`UI Telemetry Event Schema`](https://github.com/Brightspace/schema/blob/master/events/ui-telemetry-event.json)
[`Example UI Telemetry Event`](https://github.com/Brightspace/schema/blob/master/test/ui-telemetry-event.js)

[`UI Performance Event Schema`](https://github.com/Brightspace/schema/blob/master/events/ui-performance-event.json)
[`Example UI Performance Event`](https://github.com/Brightspace/schema/blob/master/test/ui-peformance-event.js)

[`UI Problem Event Schema`](https://github.com/Brightspace/schema/blob/master/events/ui-problem-event.json)
[`Example UI Problem Event`](https://github.com/Brightspace/schema/blob/master/test/ui-problem-event.js)

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
npm install Brightspace/d2l-telemetry-browser-client
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
yarn install
yarn run test
```

### Publishing

You can control the level of version bump by including either `[increment major]` or `[increment patch]` in your commit message. By default it will increment minor.


[ci-url]: https://travis-ci.com/Brightspace/d2l-telemetry-browser-client
[ci-image]: https://travis-ci.com/Brightspace/d2l-telemetry-browser-client.svg
[coverage-url]: https://coveralls.io/r/Brightspace/d2l-telemetry-browser-client?branch=master
[coverage-image]: https://img.shields.io/coveralls/Brightspace/d2l-telemetry-browser-client.svg
[dependencies-url]: https://david-dm.org/Brightspace/d2l-telemetry-browser-client
[dependencies-image]: https://img.shields.io/david/Brightspace/d2l-telemetry-browser-client.svg
